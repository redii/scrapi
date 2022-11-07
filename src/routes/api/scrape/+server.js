import prisma from "$lib/utils/prisma"
import got from "got"
import fs from "fs"

export async function GET({ url }) {
	// check scrape token
	if (url.searchParams.get("token") !== import.meta.env.VITE_SCRAPE_TOKEN)
		return new Response(
			JSON.stringify({
				success: false,
				message: "❌ Invalid Token"
			})
		)

	// get requested job from database
	const job = await prisma.job.findUnique({ where: { name: url.searchParams.get("job") } })

	// check if job exists
	if (!job)
		return new Response(
			JSON.stringify({
				success: false,
				message: "❌ Job not found"
			})
		)

	// start async scraping
	scrape(job)

	return new Response(
		JSON.stringify({
			success: true,
			message: "✅ Scraping"
		})
	)
}

async function scrape(job, preventHalfMinute = false) {
	try {
		// scrape data from url
		const response = await got.get(job.url, {
			headers: job.headers ? JSON.parse(job.headers) : {}
		})

		// save file to database
		const file = await prisma.file.create({ data: { jobId: job.id }, include: { job: true } })

		// create directory if needed
		if (!fs.existsSync(`${import.meta.env.VITE_FILES_PATH}/${job.name}`)) {
			fs.mkdirSync(`${import.meta.env.VITE_FILES_PATH}/${job.name}`, { recursive: true })
		}

		// write scraped data to file
		await fs.writeFileSync(
			`${import.meta.env.VITE_FILES_PATH}/${job.name}/${file.id}.${job.filetype}`,
			response.body
		)

		// execute parser for this job
		if (file.job.parser && fs.existsSync(`parsers/${file.job.parser}.js`)) {
			const parser = await import(/* @vite-ignore */ `../../../../parsers/${file.job.parser}.js`)
			parser.default(file, response.body)
		}

		// if halfMinute-job: execute scrape function again after 30 seconds
		if (job.halfMinute && !preventHalfMinute) setTimeout(() => scrape(job, true), 30000)
	} catch (err) {
		console.log("🚨 Error while scraping:", job.name, err)
	}
}
