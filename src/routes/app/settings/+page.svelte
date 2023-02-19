<script>
	/** @type {import('./$types').PageData} */
	export let data
</script>

<svelte:head>
	<title>Scraper > Settings</title>
</svelte:head>

<div class="sm:flex sm:items-center">
	<div class="sm:flex-auto">
		<h1 class="text-3xl font-semibold text-gray-900">Settings</h1>
		<p class="mt-2 text-sm text-gray-700">Setup by enviroment variables</p>
	</div>
</div>
<div class="space-y-8 divide-y divide-gray-200 mt-8">
	<div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
		<div class="space-y-6 sm:space-y-5">
			<div class="space-y-6 sm:space-y-5">
				<div
					class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
				>
					<label
						for="databaseUrl"
						class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2"
					>
						Database URL
					</label>
					<div class="mt-1 sm:col-span-3 sm:mt-0">
						<input
							type="text"
							name="databaseUrl"
							id="databaseUrl"
							value={data.databaseUrl}
							disabled
							class="p-2 block w-full max-w-lg rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:max-w-xs sm:text-sm"
						/>
					</div>
				</div>
				<div
					class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
				>
					<label
						for="filesPath"
						class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2"
					>
						Files Path
					</label>
					<div class="mt-1 sm:col-span-3 sm:mt-0">
						<input
							type="text"
							name="filesPath"
							id="filesPath"
							value={data.filesPath}
							disabled
							class="p-2 block w-full max-w-lg rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:max-w-xs sm:text-sm"
						/>
					</div>
				</div>
				<div
					class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
				>
					<label
						for="scrapeToken"
						class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2"
					>
						Scrape Token
					</label>
					<div class="mt-1 sm:col-span-3 sm:mt-0">
						<input
							type="text"
							name="scrapeToken"
							id="scrapeToken"
							value={data.scrapeToken}
							disabled
							class="p-2 block w-full max-w-lg rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:max-w-xs sm:text-sm"
						/>
					</div>
				</div>
				<div
					class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
				>
					<label
						for="cronjoborgToken"
						class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2"
					>
						cron-job.org Token
					</label>
					<div class="mt-1 sm:col-span-3 sm:mt-0">
						<input
							type="text"
							name="cronjoborgToken"
							id="cronjoborgToken"
							value={data.cronjoborgToken}
							disabled
							class="p-2 block w-full max-w-lg rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:max-w-xs sm:text-sm"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
