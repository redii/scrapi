import { error, redirect } from "@sveltejs/kit"
import prisma from "$lib/utils/prisma"
import got from "got"
import fs from "fs"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const parsers = (await fs.readdirSync("parsers")).map((p) => p.split(".")[0])
	const job = await prisma.job.findUnique({
		where: { id: Number(params.id) }
	})
	const events = await prisma.event.findMany({
		where: { jobId: job.id },
		orderBy: { createdAt: "desc" },
		take: 10
	})
	return { job, events, parsers }
}

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request, params }) => {
		const data = await request.formData()

		if (!data.get("name") || !data.get("cron") || !data.get("url"))
			throw error(400, "Missing argument(s)")

		const job = await prisma.job.findUnique({ where: { id: Number(params.id) } })
		const cronSplit = data.get("cron").split(" ")

		try {
			// update on cron-job.org
			// prettier-ignore
			const response = await got.patch(`https://api.cron-job.org/jobs/${job.jobId}`, {
					headers: {
						Authorization: `Bearer ${import.meta.env.VITE_CRONJOBORG_TOKEN}`,
						"Content-Type": "application/json",
					},
					json: {
						job: {
							enabled: Boolean(data.get("enabled")),
							title: data.get("name"),
							url: `https://scraper.akmnn.de/api/scrape?token=${import.meta.env.VITE_SCRAPE_TOKEN}&job=${data.get("name")}`,
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
				})
				.json()
		} catch (err) {
			console.log("🚨 Error updating cron-job.org:", job.name)
		}

		// update in database
		await prisma.job.update({
			where: { id: job.id },
			data: {
				name: data.get("name"),
				filetype: data.get("filetype"),
				url: data.get("url"),
				cron: data.get("cron"),
				perMinute: Number(data.get("perMinute")),
				headers: data.get("headers"),
				parser: data.get("parser"),
				saveFile: Boolean(data.get("saveFile")),
				enabled: Boolean(data.get("enabled"))
			}
		})

		return {
			success: true
		}
	},
	delete: async ({ request, params }) => {
		const job = await prisma.job.findUnique({ where: { id: Number(params.id) } })

		try {
			// delete on cron-job.org
			await got.delete(`https://api.cron-job.org/jobs/${jobId}`, {
				headers: {
					Authorization: `Bearer ${import.meta.env.VITE_CRONJOBORG_TOKEN}`,
					"Content-Type": "application/json"
				}
			})
		} catch (err) {
			console.log("🚨 Error deleting on cron-job.org:", job.name)
		}

		// delete in database
		await prisma.job.update({
			where: { id: job.id },
			data: { deleted: true }
		})

		throw redirect(303, "/jobs")
	}
}
