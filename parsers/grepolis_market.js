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

		// check for emptied market
		let urgent = false
		let fields = []
		const woodDiff = json.wood.capacity - json.wood.stock
		const stoneDiff = json.stone.capacity - json.stone.stock
		const ironDiff = json.iron.capacity - json.iron.stock

		if (woodDiff > threshold.normal) {
			if (woodDiff > threshold.urgent) urgent = true
			fields.push({
				name: "Wood",
				value: woodDiff,
				inline: true
			})
		}

		if (stoneDiff > threshold.normal) {
			if (stoneDiff > threshold.urgent) urgent = true
			fields.push({
				name: "Stone",
				value: stoneDiff,
				inline: true
			})
		}

		if (ironDiff > threshold.normal) {
			if (ironDiff > threshold.urgent) urgent = true
			fields.push({
				name: "Iron",
				value: ironDiff,
				inline: true
			})
		}

		// send messade to discord webhooks
		if (fields.length) {
			got.post(discordUrl, {
				json: {
					content: "@everyone",
					embeds: [
						{
							title: "Market emptied",
							description: job.name.split("/")[3],
							footer: { text: new Date().toLocaleString("de") },
							color: urgent ? "16711680" : null,
							fields
						}
					]
				}
			})

			await prisma.event.create({
				data: {
					jobId: job.id,
					subject: "Market emptied",
					body: `wood ${woodDiff}\nstone ${stoneDiff}\niron ${ironDiff}`
				}
			})
		}
	} catch (err) {
		console.log("🚨 Parsing error:", job.name, err)
	}
}
