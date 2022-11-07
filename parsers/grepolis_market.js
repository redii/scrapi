import prisma from "$lib/utils/prisma"
import got from "got"
import fs from "fs"

const discordUrl =
	"https://discord.com/api/webhooks/1038806438509821952/8kj720MCjYqRRkJ39Y0gsj_UHezn2V7HIVJTe5OrEKqdHAtBUtrD3NZ26DbXlrZIDHW1"

export default async function (job, data) {
	try {
		const json = JSON.parse(data).json

		// check for relevant changes
		let urgent = false
		let embeds = []
		const woodDiff = json.wood.capacity - json.wood.stock
		const stoneDiff = json.stone.capacity - json.stone.stock
		const ironDiff = json.iron.capacity - json.iron.stock

		if (woodDiff > 5000) {
			if (woodDiff > 20000) urgent = true
			embeds.push({
				title: "Wood",
				description: `Missing: ${woodDiff}`,
				color: woodDiff > 20000 ? "16711680" : null
			})
		}

		if (stoneDiff > 5000) {
			if (stoneDiff > 20000) urgent = true
			embeds.push({
				title: "Stone",
				description: `Missing: ${stoneDiff}`,
				color: stoneDiff > 20000 ? "16711680" : null
			})
		}

		if (ironDiff > 5000) {
			if (ironDiff > 20000) urgent = true
			embeds.push({
				title: "Iron",
				description: `Missing: ${ironDiff}`,
				color: ironDiff > 20000 ? "16711680" : null
			})
		}

		// send messade to discord webhooks
		if (embeds.length) {
			got.post(discordUrl, {
				json: {
					content: `${urgent ? "@everyone" : null}\n**${job.name.split("/")[3]}**`,
					embeds
				}
			})

			await prisma.event.create({
				data: {
					jobId: job.id,
					subject: "Empty market",
					body: `wood ${woodDiff}\nstone ${stoneDiff}\niron ${ironDiff}`
				}
			})
		}
	} catch (err) {
		console.log("🚨 Parsing error:", job.name, err)
	}
}
