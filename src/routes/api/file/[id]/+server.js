import prisma from "$lib/utils/prisma"
import fs from "fs"

export async function GET({ locals, params }) {
  // check for scrape token
  if (!locals.user) return new Response("", { status: 403 })

  // check for request id
  if (!params.id)
    return new Response(
      JSON.stringify({
        success: false,
        message: "❌ Request id missing",
      })
    )

  // get request to display
  const request = await prisma.request.findUnique({
    where: { id: params.id },
    include: { job: true },
  })

  // read file from filesystem
  const fileContent = await fs.readFileSync(
    `${import.meta.env.VITE_FILES_PATH}/${request.job.name}/${request.id}`
  )

  return new Response(fileContent, {
    headers: {
      "content-type": "text/plain",
    },
  })
}
