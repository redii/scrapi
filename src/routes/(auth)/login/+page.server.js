import { redirect } from "@sveltejs/kit"
import prisma from "$lib/utils/prisma"
import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	if (locals.user) throw redirect(302, "/")
	return
}

/** @type {import('../../../../.svelte-kit/types/src/routes/auth/$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData()
		const user = await prisma.user.findUnique({ where: { email: data.get("email") } })

		if (!user) return { success: false, message: "Benutzer existiert nicht." }
		const authenticated = await bcrypt.compare(data.get("password"), user.password)
		if (!authenticated) return { success: false, message: "Passwort ist falsch." }

		delete user.password
		delete user.refreshToken
		delete user.resetPasswordToken

		const refreshToken = uuid()
		const token = jwt.sign(user, import.meta.env.VITE_JWT_SECRET, {
			expiresIn: 30 * 86400 // 30 days
		})

		cookies.set("refresh_token", refreshToken)
		cookies.set("token", token, {
			path: "/", // send cookie for every page
			httpOnly: true, // server side only cookie so you can't use `document.cookie`
			sameSite: "strict", // only requests from same site can send cookies
			maxAge: 60 * 60 * 24 * 30 // set cookie to expire after a month
		})

		await prisma.user.update({
			where: { email: data.get("email") },
			data: { refreshToken }
		})

		throw redirect(302, "/")
	}
}
