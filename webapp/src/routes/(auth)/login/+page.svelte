<script>
  import { page } from "$app/stores"
  import { Alert } from "$lib/components"

  export let form

  const infoMessage = $page.url.searchParams.get("logout")
    ? "You have been logged out"
    : $page.url.searchParams.get("register")
    ? "Registration completed"
    : false
</script>

<svelte:head>
  <title>Login | Scrapi</title>
</svelte:head>

<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
      Sign in to Scrapi
    </h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-gray-50 py-8 px-4 border shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6" method="POST">
        {#if infoMessage}
          <Alert>{infoMessage}</Alert>
        {/if}

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
          <div class="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
          <div class="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </div>

        {#if form?.message}
          <Alert kind="danger">{form?.message}</Alert>
        {/if}
      </form>
    </div>
  </div>
</div>
