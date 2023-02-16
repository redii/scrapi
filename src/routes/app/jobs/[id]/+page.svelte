<script>
	/** @type {import('./$types').PageData} */
	export let data

	$: job = data.job
	$: showHeaders = Boolean(data.job.headers)
</script>

<svelte:head>
	<title>Scraper: {job.name}</title>
</svelte:head>

<form class="grow space-y-8 divide-y divide-gray-200" method="POST" action="?/update">
	<div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
		<div class="space-y-6 sm:space-y-5">
			<div class="flex flex-col md:flex-row justify-between items-center overflow-x-scroll">
				<div class="w-full">
					<h3 class="mb-5 text-3xl font-medium leading-6 text-gray-900">
						{job.name}
					</h3>
					<p class="mb-5 max-w-2xl text-sm text-gray-500">
						Created on {job.createdAt.toLocaleString("de")}
					</p>
				</div>
				<div class="w-full md:w-fit">
					<form method="POST" action="?/delete">
						<button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
					</form>
				</div>
			</div>
			<div class="space-y-6 sm:space-y-5">
				<div class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
					<label for="name" class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">Name</label>
					<div class="mt-1 sm:col-span-3 sm:mt-0">
						<input
							type="text"
							name="name"
							id="name"
							value={job.name}
							class="p-2 block w-full max-w-lg bg-gray-50 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:max-w-xs sm:text-sm"
						/>
					</div>
				</div>
				<div class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
					<label for="filetype" class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">Filetype</label>
					<div class="mt-1 sm:col-span-3 sm:mt-0">
						<input
							type="text"
							name="filetype"
							id="filetype"
							value={job.filetype}
							class="p-2 block w-full max-w-lg bg-gray-50 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:max-w-xs sm:text-sm"
						/>
					</div>
				</div>
				<div class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
					<label for="crontab" class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">Cron</label>
					<div class="mt-1 sm:col-span-3 sm:mt-0">
						<input
							type="text"
							name="crontab"
							id="crontab"
							bind:value={job.cron}
							class="mb-2 lg:mb-0 p-2 block lg:inline w-full max-w-lg bg-gray-50 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:max-w-xs sm:text-sm"
						/>
						{#if job.cron === "* * * * *"}
							<label for="perMinute" class="lg:ml-2 text-gray-700 text-sm">
								<select
									name="perMinute"
									id="perMinute"
									value={job.perMinute}
									class="p-2 pr-1 bg-gray-50 rounded-md border border-gray-200 shadow-sm text-right focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-700"
								>
									<option value={1}>1</option>
									<option value={2}>2</option>
									<option value={4}>4</option>
									<option value={6}>6</option>
									<option value={12}>12</option>
								</select>
								<span class="ml-1">per Minute</span>
							</label>
						{/if}
					</div>
				</div>
				<div class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
					<label for="cron" class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">Url</label>
					<div class="mt-1 sm:col-span-3 lg:col-span-2 sm:mt-0">
						<input
							type="text"
							name="url"
							id="url"
							value={job.url}
							class="p-2 block w-full bg-gray-50 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
						/>
					</div>
				</div>
				<div class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
					{#if !showHeaders}
						<button on:click={() => (showHeaders = true)} class="text-blue-500 text-left">Add headers</button>
						<input type="hidden" name="headers" value="" />
					{:else}
						<label for="headers" class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">
							Headers
							<span class="block text-sm font-light">JSON Object</span>
							<button on:click={() => (showHeaders = false)} class="mt-2 text-blue-500 text-left font-normal">
								Remove headers
							</button>
						</label>
						<div class="mt-1 sm:col-span-3 lg:col-span-2 sm:mt-0">
							<textarea
								name="headers"
								id="headers"
								rows="10"
								value={job.headers}
								class="p-2 block w-full bg-gray-50 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
							/>
						</div>
					{/if}
				</div>
				<div class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
					<label for="parser" class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">Parser</label>
					<div class="mt-1 sm:col-span-1 sm:mt-0">
						<select
							name="parser"
							id="parser"
							value={job.parser}
							class="p-2 block w-full bg-gray-50 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-700"
						>
							<option value="">none</option>
							{#each data.parsers as parser}
								<option value={parser}>{parser}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
					<label for="saveFile" class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">Save File</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<input type="checkbox" name="saveFile" id="saveFile" checked={job.saveFile} />
					</div>
				</div>
				<div class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
					<label for="enabled" class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">Enabled</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<input type="checkbox" name="enabled" id="enabled" checked={job.enabled} />
					</div>
				</div>
				<div>
					<button
						class="mt-6 rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
					>
						Save
					</button>
				</div>
			</div>
		</div>
	</div>
</form>
