import prisma from "$lib/utils/prisma"
import archiver from "archiver"
import rimraf from "rimraf"
import fs from "fs"

export async function GET({ url, params }) {
	if (url.searchParams.get("token") !== import.meta.env.VITE_SCRAPE_TOKEN) {
		return new Response(
			JSON.stringify({
				success: false,
				message: "Token invalid"
			})
		)
	}

	const jobs = await prisma.job.findMany({
		where: { filetype: "json" }
	})

	for (const job of jobs) {
		const archive = archiver("zip", { zlib: { level: 9 } })
		const output = fs.createWriteStream(`${import.meta.env.VITE_FILES_PATH}/${job.name}/${new Date().getTime()}.zip`)
		archive.pipe(output)
		archive.glob("*.json", { cwd: `${import.meta.env.VITE_FILES_PATH}/${job.name}` })
		await archive.finalize()
		rimraf(`${import.meta.env.VITE_FILES_PATH}/${job.name}/*.json`, () => {})
	}

	return new Response(
		JSON.stringify({
			success: true,
			message: "Files archived"
		})
	)
}
