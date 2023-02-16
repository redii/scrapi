import { error, redirect } from "@sveltejs/kit"
import prisma from "$lib/utils/prisma"
import got from "got"
import fs from "fs"

/** @type {import('./$types').PageLoad} */
export async function load() {
	const parsers = (await fs.readdirSync("parsers")).map((p) => p.split(".")[0])
	return { parsers }
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const cronSplit = data.get("crontab").split(" ")

		// check arguments
		if (!data.get("name") || !data.get("filetype") || !data.get("crontab") || !data.get("url"))
			throw error(400, "Missing argument(s)")

		// save job in database
		const job = await prisma.job.create({
			data: {
				name: data.get("name"),
				filetype: data.get("filetype"),
				url: data.get("url"),
				crontab: data.get("crontab"),
				perMinute: Number(data.get("perMinute")),
				headers: data.get("headers"),
				parser: data.get("parser"),
				saveFile: Boolean(data.get("saveFile")),
			},
		})

		// create job at cron-job.org
		// prettier-ignore
		const response = await got.put("https://api.cron-job.org/jobs", {
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_CRONJOBORG_TOKEN}`,
				"Content-Type": "application/json",
			},
			json: {
				job: {
					enabled: true,
					title: job.name,
					url: `https://scraper.akmnn.de/api/scrape/${job.id}?token=${import.meta.env.VITE_SCRAPE_TOKEN}`,
					saveResponses: true,
					schedule: {
						timezone: "Europe/Berlin",
						minutes: cronSplit[0] === "*" ? [-1] : cronSplit[0].split(","),
						hours: cronSplit[1] === "*" ? [-1] : cronSplit[1].split(","),
						mdays: cronSplit[2] === "*" ? [-1] : cronSplit[2].split(","),
						months: cronSplit[3] === "*" ? [-1] : cronSplit[3].split(","),
						wdays: cronSplit[4] === "*" ? [-1] : cronSplit[4].split(","),
					},
				},
			},
		}).json()

		await prisma.job.update({
			where: { id: job.id },
			data: { cronjobId: response.jobId },
		})

		throw redirect(302, `/app/jobs/${job.id}`)
	},
}
