<script>
  import "../app.css"

  export let data
</script>

<header class="bg-blue-600">
  <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex w-full items-center justify-between border-b py-6 lg:border-none">
      <div class="flex items-center">
        <a href="/">
          <span class="sr-only">Scrapi</span>
          <img class="h-10 w-auto" src="/favicon.png" alt="Scrapi" />
        </a>
        {#if data.user}
          <div class="ml-10 hidden space-x-8 lg:block">
            <a href="/app/jobs" class="text-base font-medium text-white hover:text-blue-50">
              Jobs
            </a>
            <a href="/app/requests" class="text-base font-medium text-white hover:text-blue-50">
              Requests
            </a>
            <a href="/app/settings" class="text-base font-medium text-white hover:text-blue-50">
              Settings
            </a>
          </div>
        {/if}
      </div>
      {#if data.user}
        <form class="ml-10 space-x-4" method="POST" action="/logout">
          <button
            class="inline-block rounded-md border border-transparent bg-blue-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
          >
            Logout
          </button>
        </form>
      {:else}
        <div class="ml-10 space-x-4">
          <a
            href="/login"
            class="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-blue-600 hover:bg-blue-50 duration-200"
          >
            Sign in
          </a>
        </div>
      {/if}
    </div>
    {#if data.user}
      <div class="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
        <a href="/app/jobs" class="text-base font-medium text-white hover:text-blue-50">Jobs</a>
        <a href="/app/requests" class="text-base font-medium text-white hover:text-blue-50">
          Requests
        </a>
        <a href="/app/settings" class="text-base font-medium text-white hover:text-blue-50">
          Settings
        </a>
      </div>
    {/if}
  </nav>
</header>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 pt-12 lg:pb-28">
  <div class="flex flex-col gap-8 sm:gap-12">
    <slot />
  </div>
</div>
