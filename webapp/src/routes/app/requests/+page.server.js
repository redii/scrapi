import prisma from "$lib/utils/prisma"

export async function load({ url }) {
  const pageParam = Number(url.searchParams.get("page"))
  const page = pageParam || 0
  const total = prisma.request.count()
  const requests = await prisma.request.findMany({
    orderBy: { createdAt: "desc" },
    include: { job: true },
    skip: page * 10,
    take: 10,
  })
  return { requests, total }
}
