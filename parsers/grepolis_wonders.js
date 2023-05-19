import prisma from "$lib/utils/prisma"
import got from "got"
import fs from "fs"

const discordUrls = [
  "https://discord.com/api/webhooks/1039481252933283870/0XRxGIb9-O_opwVotTxQWKMiqFGB37n-tCTYpk6-CYUkXeCd_OZcCj6gWEoL0hDVbgTJ",
  "https://discord.com/api/webhooks/1098896949333205052/K24MitjJq4kAZcn4DcZ-TQ-sy_kpd2yNzFtf4io7wrF3HWfsjfmfbRP_ObUM_TdMRuy3",
]

const wonders = [
  {
    name: "great_pyramid_of_giza",
    label: "Die Pyramiden von Gizeh in Ägypten",
  },
  {
    name: "colossus_of_rhodes",
    label: "Der Koloss von Rhodos",
  },
  {
    name: "lighthouse_of_alexandria",
    label: "Der Leuchtturm auf der Insel Pharos vor Alexandria",
  },
  {
    name: "temple_of_artemis_at_ephesus",
    label: "Der Tempel der Artemis in Ephesos",
  },
  {
    name: "hanging_gardens_of_babylon",
    label: "Die hängenden Gärten der Semiramis zu Babylon",
  },
  {
    name: "mausoleum_of_halicarnassus",
    label: "Das Grab des Königs Mausolos II. zu Halikarnassos",
  },
  {
    name: "statue_of_zeus_at_olympia",
    label: "Die Zeusstatue des Phidias von Olympia",
  },
]

export default async function (rawData, job, request = false) {
  try {
    let data = JSON.parse(rawData).json.models.WondersRanking.data

    // get data from last file scraped
    const lastRequest = await prisma.request.findFirst({
      where: { jobId: job.id },
      orderBy: { id: "desc" },
      skip: 1,
    })

    if (lastRequest) {
      // get data from last file
      const lastRawData = await fs.readFileSync(
        `${import.meta.env.VITE_FILES_PATH}/${job.name}/${lastRequest.id}`
      )
      const lastData = JSON.parse(lastRawData).json.models.WondersRanking.data

      data.ranking.forEach(async (alliance) => {
        const lastDataAlliance = lastData.ranking.find(
          (a) => a.alliance_id === alliance.alliance_id
        )
        wonders.forEach(async (wonder) => {
          if (alliance[wonder.name].level !== lastDataAlliance[wonder.name].level)
            // prettier-ignore
            discordUrls.forEach(url => {
              got.post(url, {
                json: {
                  content: "@everyone",
                  embeds: [
                    {
                      thumbnail: { url: `https://de136.grepolis.com/image.php?alliance_id=${alliance.alliance_id}` },
                      title: `${alliance.alliance_name} - ${wonder.label}`,
                      description: `Level ${lastDataAlliance[wonder.name].level} > ${alliance[wonder.name].level}`,
                      footer: { text: new Date().toLocaleString("de-DE") },
                      color: "16711680",
                    },
                  ]
                },
              })
            })
        })
      })
    }
  } catch (err) {
    console.log("🚨 Parsing error:", job.name, err)
  }
}
