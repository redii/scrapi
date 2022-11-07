import prisma from "$lib/utils/prisma"
import got from "got"

const threshold = {
	normal: 5000,
	urgent: 20000
}

const discordUrl =
	"https://discord.com/api/webhooks/1038806438509821952/8kj720MCjYqRRkJ39Y0gsj_UHezn2V7HIVJTe5OrEKqdHAtBUtrD3NZ26DbXlrZIDHW1"

export default async function (job, data, file = false) {
	try {
		const json = JSON.parse(data).json

		// check for relevant changes
		let urgent = false
		let embeds = []
		const woodDiff = json.wood.capacity - json.wood.stock
		const stoneDiff = json.stone.capacity - json.stone.stock
		const ironDiff = json.iron.capacity - json.iron.stock

		if (woodDiff > threshold.normal) {
			if (woodDiff > threshold.urgent) urgent = true
			embeds.push({
				title: "Wood",
				description: `Missing: ${woodDiff}`,
				color: woodDiff > threshold.urgent ? "16711680" : null
			})
		}

		if (stoneDiff > threshold.normal) {
			if (stoneDiff > threshold.urgent) urgent = true
			embeds.push({
				title: "Stone",
				description: `Missing: ${stoneDiff}`,
				color: stoneDiff > threshold.urgent ? "16711680" : null
			})
		}

		if (ironDiff > threshold.normal) {
			if (ironDiff > threshold.urgent) urgent = true
			embeds.push({
				title: "Iron",
				description: `Missing: ${ironDiff}`,
				color: ironDiff > threshold.urgent ? "16711680" : null
			})
		}

		// send messade to discord webhooks
		if (embeds.length) {
			got.post(discordUrl, {
				json: {
					content: `${urgent ? "@everyone" : ""}\n**${job.name.split("/")[3]}**`,
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
