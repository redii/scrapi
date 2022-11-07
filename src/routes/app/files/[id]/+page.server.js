import { redirect } from "@sveltejs/kit"
import prisma from "$lib/utils/prisma"
import fs from "fs"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const file = await prisma.file.findUnique({
		where: { id: Number(params.id) },
		include: { job: true }
	})
	return { file }
}

/** @type {import('./$types').Actions} */
export const actions = {
	delete: async ({ params }) => {
		const file = await prisma.file.findUnique({
			where: { id: Number(params.id) },
			include: { job: true }
		})

		await prisma.file.delete({ where: { id: file.id } })

		fs.unlink(
			`${import.meta.env.VITE_FILES_PATH}/${file.job.name}/${file.id}.${file.job.filetype}`,
			() => console.log("❌ File has been deleted")
		)

		throw redirect(302, "/app/files")
	}
}
