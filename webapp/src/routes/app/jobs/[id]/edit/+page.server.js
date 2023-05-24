import { error, redirect } from "@sveltejs/kit"
import Job from "$lib/classes/Job"
import prisma from "$lib/utils/prisma"

export async function load({ params }) {
  try {
    const job = new Job(params.id)
    return {
      job: await job.getData(),
    }
  } catch (err) {
    throw error(404, "Job not found")
  }
}

export const actions = {
  update: async ({ request, params }) => {
    const data = await request.formData()

    const job = new Job(params.id)
    await job.update(data)

    throw redirect(302, `/app/jobs/${params.id}`)
  },
  delete: async ({ request, params }) => {
    await prisma.job.delete({ where: { id: job.id } })
    throw redirect(302, "/app/jobs")
  },
  "parser-update": async ({ request, params }) => {
    const data = await request.formData()

    if (data.get("id")) {
      await prisma.parser.update({
        where: { id: data.get("id") },
        data: {
          name: data.get("name"),
          code: data.get("code"),
        },
      })
    } else {
      await prisma.parser.create({
        data: {
          name: data.get("name"),
          code: data.get("code"),
          job: { connect: { id: params.id } },
        },
      })
    }

    throw redirect(302, `/app/jobs/${params.id}/edit`)
  },
  "parser-delete": async ({ request, params }) => {
    const data = await request.formData()
    await prisma.parser.delete({ where: { id: data.get("id") } })
    throw redirect(302, `/app/jobs/${params.id}/edit`)
  },
}
