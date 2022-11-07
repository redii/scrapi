import jwt from 'jsonwebtoken'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	try {
		const token = event.cookies.get('token')

		if (token) {
			// refresh token if needed
			// update refreshToken in user object and reset refresh_token cookie
			const result = jwt.verify(token, import.meta.env.VITE_JWT_SECRET)
			if (result.id) event.locals.user = result
		}

		// redirect unauthenticated app requests
		if (event.url.pathname.startsWith('/app') && !event.locals.user) {
			return new Response('', {
				headers: { Location: '/' },
				status: 302
			})
		}

		const response = await resolve(event)
		return response
	} catch (err) {
		console.log(err)
		const response = await resolve(event)
		return response
	}
}
