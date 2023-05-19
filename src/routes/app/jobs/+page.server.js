import prisma from "$lib/utils/prisma"

export async function load() {
  const jobs = await prisma.job.findMany({
    orderBy: { name: "asc" },
  })
  return { jobs }
}
