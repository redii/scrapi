import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load() {
	throw redirect(302, '/')
}

/** @type {import('../../../../.svelte-kit/types/src/routes/auth/$types').Actions} */
export const actions = {
	default: async ({ cookies }) => {
		cookies.set('token', '', {
			path: '/',
			expires: new Date(0)
		})

		throw redirect(302, '/?logout=true')
	}
}
