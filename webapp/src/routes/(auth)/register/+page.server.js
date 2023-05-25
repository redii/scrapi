import { redirect } from "@sveltejs/kit"
import prisma from "$lib/utils/prisma"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function load({ locals }) {
  const users = await prisma.user.findMany()
  if (users.length) throw redirect(303, "/")
  return
}

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(data.get("password"), salt)
    const user = await prisma.user.create({
      data: {
        email: data.get("email"),
        password: hash,
        refreshToken: uuid(),
        resetPasswordToken: uuid(),
      },
    })

    throw redirect(302, "/login&register=true")
  },
}
