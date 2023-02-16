import prisma from "$lib/utils/prisma"
import archiver from "archiver"
import rimraf from "rimraf"
import fs from "fs"

export async function GET({ url, params }) {
	// check for scrape token
	if (url.searchParams.get("token") !== import.meta.env.VITE_SCRAPE_TOKEN)
		return new Response(
			JSON.stringify({
				success: false,
				message: "❌ Token invalid",
			}),
		)

	// check for job id
	if (!params.id)
		return new Response(
			JSON.stringify({
				success: false,
				message: "❌ No Job ID provided",
			}),
		)

	// get job to archive
	const job = await prisma.job.findUnique({
		where: { id: Number(params.id) },
	})

	const archive = archiver("zip", { zlib: { level: 9 } })
	const output = fs.createWriteStream(`${import.meta.env.VITE_FILES_PATH}/${job.name}/${new Date().getTime()}.zip`)
	archive.pipe(output)
	archive.glob("*", { cwd: `${import.meta.env.VITE_FILES_PATH}/${job.name}` })
	await archive.finalize()
	rimraf(`${import.meta.env.VITE_FILES_PATH}/${job.name}/*`, () => {})

	return new Response(
		JSON.stringify({
			success: true,
			message: "✅ Job archived",
		}),
	)
}
