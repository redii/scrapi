import prisma from "$lib/utils/prisma"
import got from "got"

const threshold = {
	normal: 5000,
	urgent: 20000
}

// prettier-ignore
const discordUrls = {
	"de135": {
		"sea44": "https://discord.com/api/webhooks/1039888859690975294/V21S-P0jdL82siOidhUiWyeyrdx5968B_a5rEvqQzAthQkwI9OO7N29ybjIZ_lyzAT4L",
		"sea45": "https://discord.com/api/webhooks/1039888945581924393/_7f9d_z1nSJUHiBWk7BRMx2Xz6ZBtp7cnNHd-1GjWC2tHA9aRw2LpGEx2FYTIzi3YOHy",
		"sea54": "https://discord.com/api/webhooks/1039886335693041764/JeeSiIN9helfO12Vsw6SgKrRZeu8DXyEM6ArZCUxTuPxEqzxgGNNnjtndLK9SsT0kBYi",
		"sea55": "https://discord.com/api/webhooks/1039888658012053564/dW2CazgEDYyQgbiTqEQ6-K4pODM0bcdKv4NR5kTfhgH7WLjkRc2VtCIfwQi4YvV-NKuW"
	}
}

export default async function (job, data, file = false) {
	try {
		const json = JSON.parse(data).json
		const world = job.name.split("/")[1]
		const sea = job.name.split("/")[3]

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
			got.post(discordUrls[world][sea], {
				json: {
					content: "@everyone",
					embeds: [
						{
							title: "Market emptied",
							description: sea,
							footer: { text: new Date().toLocaleString("de-DE") },
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
