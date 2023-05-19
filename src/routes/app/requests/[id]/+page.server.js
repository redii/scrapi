import { redirect } from "@sveltejs/kit"
import Request from "$lib/classes/Request"
import prisma from "$lib/utils/prisma"
import fs from "fs"

export async function load({ params }) {
  const request = new Request(params.id)
  await request.getData()

  let fileContent
  if (request.fileSaved) fileContent = (await request.getFileContent()).toString()

  return {
    request: request.serialize(),
    fileContent: fileContent,
  }
}
