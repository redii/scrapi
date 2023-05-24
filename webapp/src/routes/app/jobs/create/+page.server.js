import { redirect } from "@sveltejs/kit"
import prisma from "$lib/utils/prisma"

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
        crontab: data.get("crontab"),
        url: data.get("url"),
        httpMethod: data.get("httpMethod"),
        postData: data.get("postData"),
        headers: data.get("headers"),
        saveFile: Boolean(data.get("saveFile")),
      },
    })

    throw redirect(302, `/app/jobs/${job.id}`)
  },
}
