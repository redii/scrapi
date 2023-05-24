import vm from "node:vm"
import fs from "node:fs"
import { Cron } from "croner"
import got, { Options } from "got"

import { PrismaClient } from "./prisma-client"
const prisma = new PrismaClient()

var log = console.log
console.log = function () {
  var args = Array.from(arguments)
  args.unshift(`[${new Date().toLocaleString("de-DE", { timeZone: "CET" })}]`)
  log.apply(console, args)
}

const runningJobs = []

;(async function main() {
  console.log("👋 Cron Daemon starting...")
  const daemonJob = Cron("29,59 * * * * *", checkJobs)
  daemonJob.trigger()
})()

async function checkJobs() {
  const enabledJobs = await prisma.job.findMany({
    where: { enabled: true },
    include: { parsers: true },
  })

  // stop disabled jobs
  for (const job of Object.values(runningJobs)) {
    const found = enabledJobs.find((j) => j.id === job.id)
    if (!found) {
      const index = runningJobs.findIndex((j) => j.id !== job.id)
      runningJobs.splice(index, 1)
      job.cronjob.stop()
      console.log("❌ Cronjob stopped:", job.name)
    }
  }

  for (const job of enabledJobs) {
    const found = runningJobs.find((j) => j.id === job.id)

    if (found) {
      if (found.updatedAt.toString() !== job.updatedAt.toString()) {
        const index = runningJobs.findIndex((j) => j.id === job.id)
        runningJobs[index].cronjob.stop()
        runningJobs[index].name = job.name
        runningJobs[index].updatedAt = job.updatedAt
        runningJobs[index].cronjob = Cron(job.crontab, () => scrape(job))
        console.log("✅ Cronjob updated:", job.name)
      }
    } else {
      runningJobs.push({
        id: job.id,
        name: job.name,
        parsers: job.parsers,
        updatedAt: job.updatedAt,
        cronjob: Cron(job.crontab, () => scrape(job)),
      })
      console.log("✅ Cronjob created:", job.name)
    }
  }
}

async function scrape(job) {
  console.log("👀 Scraping:", job.name)

  const httpMethod = job.httpMethod.toLowerCase()
  const httpOptions = new Options({
    headers: job.headers ? JSON.parse(job.headers) : {},
  })

  // add postData to options
  if (httpMethod === "post") httpOptions.body = job.postData

  // scrape data from url
  const response = await got[httpMethod](job.url, httpOptions)

  // save request to database
  const request = await prisma.request.create({
    data: {
      fileSaved: job.saveFile,
      jobId: job.id,
    },
  })

  // check if file should be saved
  if (job.saveFile) {
    // create directory if needed
    if (!fs.existsSync(`${process.env.FILES_PATH}/${job.name}`)) {
      fs.mkdirSync(`${process.env.FILES_PATH}/${job.name}`, { recursive: true })
    }

    // write scraped data to file
    await fs.writeFileSync(`${process.env.FILES_PATH}/${job.name}/${request.id}`, response.body)
  }

  // execute parser function
  for (const parser of job.parsers) {
    try {
      const context = { rawData: response.body, job, request, got }
      vm.createContext(context)
      const code = `${parser.code}; parser(rawData, job, request)`
      vm.runInContext(code, context)
    } catch (err) {
      console.log(`🚨 Parser-Error: ${job.name}`, err)
    }
  }
}
