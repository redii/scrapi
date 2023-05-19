import { error, redirect } from "@sveltejs/kit"
import prisma from "$lib/utils/prisma"
import config from "$lib/utils/config"
import got from "got"
import fs from "fs"

export async function load() {
  const parsers = (await fs.readdirSync("parsers")).map((p) => p.split(".")[0])
  return { parsers }
}

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const cronSplit = data.get("crontab").split(" ")

    // check arguments
    if (!data.get("name") || !data.get("crontab") || !data.get("url"))
      throw error(400, "Missing argument(s)")

    // save job in database
    const job = await prisma.job.create({
      data: {
        name: data.get("name"),
        url: data.get("url"),
        crontab: data.get("crontab"),
        headers: data.get("headers"),
        saveFile: Boolean(data.get("saveFile")),
      },
    })

    throw redirect(302, `/app/jobs/${job.id}`)
  },
}
