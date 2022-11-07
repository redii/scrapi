import prisma from "$lib/utils/prisma"

/** @type {import('./$types').PageLoad} */
export async function load() {
	const jobs = await prisma.job.findMany({
		where: { deleted: false },
		orderBy: { name: "asc" }
	})
	return { jobs }
}
