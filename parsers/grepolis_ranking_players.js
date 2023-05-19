import prisma from "$lib/utils/prisma"
import got from "got"
import fs from "fs"

const discordUrl =
  "https://discord.com/api/webhooks/1039253230149963786/tZAb_vF9Brw1R8rg92ioWwWHpc69QQPeL66QfoSu3xhAXsUtJ64cT1SBre2b6NsGYVyz"

export default async function (rawData, job, request = false) {
  try {
    let data = JSON.parse(rawData)

    // get more players from ranking (300)
    for (let i = 1; i < 10; i++) {
      let tmpUrl = job.url
      tmpUrl.replace('"start_element":0', `"start_element":${30 * i}`)
      const response = await got
        .get(tmpUrl, {
          headers: JSON.parse(job.headers),
        })
        .json()
      data.json.ranklist = [...data.json.ranklist, ...response.json.ranklist]
    }

    // save complete data to existing file
    await fs.writeFileSync(
      `${import.meta.env.VITE_FILES_PATH}/${job.name}/${request.id}`,
      JSON.stringify(data)
    )

    // get data from last file scraped
    const lastRequest = await prisma.request.findFirst({
      where: { jobId: job.id },
      orderBy: { id: "desc" },
    })

    if (lastRequest) {
      // get data from last file
      const lastRawData = await fs.readFileSync(
        `${import.meta.env.VITE_FILES_PATH}/${job.name}/${lastRequest.id}`
      )
      const lastData = JSON.parse(lastRawData)

      // stop if data is missing in last file
      if (lastData.json.ranklist.length < 300) return

      // check for missing players
      let missingPlayers = []
      for (let i = 0; i < 250; i++) {
        const found = data.json.ranklist.find(
          (player) => player.id === lastData.json.ranklist[i].id
        )
        if (!found) missingPlayers = [...missingPlayers, lastData.json.ranklist[i]]
      }

      // if a player is missing post to discord
      if (missingPlayers.length) {
        let embeds = missingPlayers.map((player) => {
          return {
            title: `${player.name} ghosted`,
            description: `Rank ${player.rank}`,
            color: "16711680",
          }
        })

        got.post(discordUrl, {
          json: {
            content: "@everyone",
            embeds,
          },
        })
      }
    }
  } catch (err) {
    console.log("🚨 Parsing error:", job.name, err)
  }
}
