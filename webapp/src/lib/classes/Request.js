import prisma from "$lib/utils/prisma"
import fs from "fs"

class Request {
  constructor(id) {
    this.id = id
  }

  getData() {
    return new Promise(async (resolve, reject) => {
      try {
        const request = await prisma.request.findUnique({
          where: { id: this.id },
          include: { job: true },
        })
        if (!request) throw "Request not found"
        Object.assign(this, request)
        resolve(request)
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

  setData(data) {
    Object.assign(this, data)
    return
  }

  async getFileContent() {
    if (!this.job) await this.getData()
    return fs.readFileSync(`${import.meta.env.VITE_FILES_PATH}/${this.job.name}/${this.id}`)
  }
}

export default Request
