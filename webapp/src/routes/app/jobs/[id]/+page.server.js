import { error } from "@sveltejs/kit"
import Job from "$lib/classes/Job"
import config from "$lib/utils/config"

export async function load({ params }) {
  try {
    const job = new Job(params.id)

    const requestCountTotal = await job.getRequestCount()
    const requestCountLastDay = await job.getRequestCount(1)

    const latestRequests = await job.getRequests()

    return {
      job: await job.getData(),
      requestCountTotal,
      requestCountLastDay,
      latestRequests,
    }
  } catch (err) {
    throw error(404, "Job not found")
  }
}
