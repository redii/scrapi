import config from "$lib/utils/config"
import jwt from "jsonwebtoken"
import { redirect } from "@sveltejs/kit"

export async function handle({ event, resolve }) {
  try {
    const token = event.cookies.get("token")
    if (token) {
      // TODO: refresh token if needed
      // update refreshToken in user object and reset refresh_token cookie
      const user = jwt.verify(token, await config.get("JWT_SECRET"))
      if (user.id) event.locals.user = user
    }

    // redirect unauthenticated app requests
    if (event.url.pathname.startsWith("/app") && !event.locals.user) {
      return new Response("", {
        headers: { Location: "/login" },
        status: 302,
      })
    }
  } catch (err) {
    console.log(err)
  }

  const response = await resolve(event)
  return response
}
