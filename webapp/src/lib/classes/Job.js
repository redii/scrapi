import prisma from "$lib/utils/prisma"
import Request from "$lib/classes/Request"

class Job {
  constructor(id) {
    this.id = id
  }

  getData() {
    return new Promise(async (resolve, reject) => {
      try {
        const job = await prisma.job.findUnique({
          where: { id: this.id },
          include: { parsers: true },
        })
        if (!job) throw "Job not found"
        Object.assign(this, job)
        resolve(job)
      } catch (err) {
        console.log(err)
        reject()
      }
    })
  }

  update(formData) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!formData.get("name") || !formData.get("crontab") || !formData.get("url"))
          reject("Missing argument(s)")

        const job = await prisma.job.update({
          where: { id: this.id },
          data: {
            name: formData.get("name"),
            crontab: formData.get("crontab"),
            url: formData.get("url"),
            httpMethod: formData.get("httpMethod"),
            postData: formData.get("postData"),
            headers: formData.get("headers"),
            saveFile: Boolean(formData.get("saveFile")),
            enabled: Boolean(formData.get("enabled")),
          },
        })

        resolve(job)
      } catch (err) {
        console.log(err)
        reject()
      }
    })
  }

  delete() {
    return new Promise(async (resolve, reject) => {
      try {
        await prisma.job.delete({ where: { id: this.id } })
        resolve()
      } catch (err) {
        console.log(err)
        reject()
      }
    })
  }

  serialize() {
    return JSON.parse(JSON.stringify(this), (key, value) => {
      const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
      if (typeof value === "string" && dateFormat.test(value)) return new Date(value)
      return value
    })
  }

  getRequests(take = 10, skip = 0) {
    return prisma.request.findMany({
      where: { jobId: this.id },
      orderBy: { createdAt: "desc" },
      take,
      skip,
    })
  }

  getRequestCount(days = 0) {
    let threshold = days
      ? new Date(Date.now() - 1000 * 60 * 60 * 24 * days).toISOString()
      : undefined
    return prisma.request.count({
      where: { jobId: this.id, createdAt: { gte: threshold } },
      orderBy: { createdAt: "desc" },
    })
  }
}

export default Job
