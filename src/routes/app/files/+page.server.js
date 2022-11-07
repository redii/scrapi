import prisma from "$lib/utils/prisma"

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
	const pageParam = Number(url.searchParams.get("page"))
	const page = pageParam || 0
	const total = prisma.file.count()
	const files = await prisma.file.findMany({
		orderBy: { id: "desc" },
		include: { job: true },
		skip: page * 10,
		take: 10
	})
	return { files, total }
}
