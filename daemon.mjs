import { Cron } from "croner"
import vm from "node:vm"
import got from "got"
import fs from "fs"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const runningJobs = []

;(async function main() {
  console.log("[DAEMON] 👋 Cron Daemon starting...")
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
      console.log("[DAEMON] ❌ Cronjob stopped:", job.name)
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
        console.log("[DAEMON] ✅ Cronjob updated:", job.name)
      }
    } else {
      runningJobs.push({
        id: job.id,
        name: job.name,
        parsers: job.parsers,
        updatedAt: job.updatedAt,
        cronjob: Cron(job.crontab, () => scrape(job)),
      })
      console.log("[DAEMON] ✅ Cronjob created:", job.name)
    }
  }
}

async function scrape(job) {
  console.log("[DAEMON] 👀 Scraping:", job.name)

  // scrape data from url
  const response = await got.get(job.url, {
    headers: job.headers ? JSON.parse(job.headers) : {},
  })

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
    if (!fs.existsSync(`${process.env.VITE_FILES_PATH}/${job.name}`)) {
      fs.mkdirSync(`${process.env.VITE_FILES_PATH}/${job.name}`, { recursive: true })
    }

    // write scraped data to file
    await fs.writeFileSync(
      `${process.env.VITE_FILES_PATH}/${job.name}/${request.id}`,
      response.body
    )
  }

  // execute parser function
  for (const parser of job.parsers) {
    try {
      const context = {
        rawData: response.body,
        job,
        request,
        got,
      }

      const code = `${parser.code}; parser(rawData, job, request)`
      vm.createContext(context)
      vm.runInContext(code, context)
    } catch (err) {
      console.log(`[DAEMON] Parser-Error: ${job.name}`, err)
    }
  }
}
