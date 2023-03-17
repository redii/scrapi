import got from "got"

export default async function (rawData, job, file = false) {
  try {
    const data = JSON.parse(rawData)
    const nextSlot = new Date(data.next_slot)
    if (nextSlot.getDate() <= 13 && nextSlot.getMonth() <= 3)
      await got.post("https://ntfy.sh/doctolib-raschplatz", {
        body: `Neuer Termin am ${nextSlot.toLocaleString("de")}`,
      })
  } catch (err) {
    console.log("🚨 Parsing error:", job.name, err)
  }
}
