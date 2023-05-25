import { redirect } from "@sveltejs/kit"

export async function load({ cookies }) {
  cookies.set("token", "", {
    path: "/",
    expires: new Date(0),
  })

  throw redirect(302, "/?logout=true")
}

export const actions = {
  default: async ({ cookies }) => {
    cookies.set("token", "", {
      path: "/",
      expires: new Date(0),
    })

    throw redirect(302, "/login?logout=true")
  },
}
