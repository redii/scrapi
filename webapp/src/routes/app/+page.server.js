import prisma from "$lib/utils/prisma"

export async function load({ locals }) {
  const jobCount = await prisma.job.count({ where: { enabled: true } })
  const requestCountTotal = await prisma.request.count()

  let threshold = Date.now() - 24 * 60 * 60 * 1000 * 7
  const requestCountLast7Days = await prisma.request.count({
    where: { createdAt: { gte: new Date(threshold).toISOString() } },
  })

  const latestRequests = await prisma.request.findMany({
    orderBy: { createdAt: "desc" },
    include: { job: true },
    take: 6,
  })

  return {
    jobCount,
    requestCountTotal,
    requestCountLast7Days,
    latestRequests,
  }
}
