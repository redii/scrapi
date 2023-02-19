import prisma from "$lib/utils/prisma"

export async function load() {
	const jobs = await prisma.job.findMany({
		where: { deleted: false },
		orderBy: { name: "asc" },
	})
	return { jobs }
}
