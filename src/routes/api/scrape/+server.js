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
	const job = await prisma.job.findFirst({
		where: {
			name: url.searchParams.get("job"),
			enabled: true,
			deleted: false
		}
	})

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

async function scrape(job, preventPerMinute = false) {
	try {
		// scrape data from url
		const response = await got.get(job.url, {
			headers: job.headers ? JSON.parse(job.headers) : {}
		})

		// check if file should be saved
		let file = false
		if (job.saveFile) {
			// save file to database
			file = await prisma.file.create({ data: { jobId: job.id }, include: { job: true } })

			// create directory if needed
			if (!fs.existsSync(`${import.meta.env.VITE_FILES_PATH}/${job.name}`)) {
				fs.mkdirSync(`${import.meta.env.VITE_FILES_PATH}/${job.name}`, { recursive: true })
			}

			// write scraped data to file if needed
			await fs.writeFileSync(
				`${import.meta.env.VITE_FILES_PATH}/${job.name}/${file.id}.${job.filetype}`,
				response.body
			)
		}

		// execute parser for this job
		if (job.parser && fs.existsSync(`parsers/${job.parser}.js`)) {
			const parser = await import(/* @vite-ignore */ `../../../../parsers/${job.parser}.js`)
			parser.default(job, response.body, file)
		}

		// if perMinute > 1: execute scrape function multiple times
		if (job.cron === "* * * * *" && job.perMinute > 1 && !preventPerMinute) {
			const interval = (1000 * 60) / job.perMinute
			for (let i = 1; i < job.perMinute; i++) {
				setTimeout(() => scrape(job, true), interval * i)
			}
		}
	} catch (err) {
		console.log("🚨 Error while scraping:", job.name, err)
	}
}
