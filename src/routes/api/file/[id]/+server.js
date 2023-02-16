import prisma from "$lib/utils/prisma"
import fs from "fs"

export async function GET({ url, params }) {
	// check for scrape token
	if (url.searchParams.get("token") !== import.meta.env.VITE_SCRAPE_TOKEN)
		return new Response(
			JSON.stringify({
				success: false,
				message: "Token invalid",
			}),
		)

	// check for file id
	if (!params.id)
		return new Response(
			JSON.stringify({
				success: false,
				message: "❌ No File ID provided",
			}),
		)

	// get file to display
	const file = await prisma.file.findUnique({
		where: { id: Number(params.id) },
		include: { job: true },
	})

	// read file from filesystem
	const fileContent = await fs.readFileSync(`${import.meta.env.VITE_FILES_PATH}/${file.job.name}/${file.id}.${file.job.filetype}`)

	return new Response(fileContent, {
		headers: {
			"content-type": "text/plain",
		},
	})
}
