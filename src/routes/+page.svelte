<script>
	/** @type {import('./$types').PageData} */
	export let data
</script>

<svelte:head>
	<title>Scraper 👋</title>
</svelte:head>

<div class="pb-20 lg:pb-28">
	<div class="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
		<div>
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome! 👋</h2>
			<p class="mt-3 text-xl text-gray-500 sm:mt-4">Scraper Dashboard</p>
			{#if data.user}
				<hr class="my-6" />
				<p class="text-lg text-gray-900">
					Signed in as {data.user.email}
				</p>
			{/if}
		</div>
	</div>
</div>
