<script>
	import { enhance } from "$app/forms"

	/** @type {import('./$types').PageData} */
	export let data

	$: newJob = {}
	$: showHeaders = false
</script>

<svelte:head>
	<title>Scraper > Create Job</title>
</svelte:head>

<form class="space-y-8 divide-y divide-gray-200" method="POST" use:enhance>
	<div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
		<div class="space-y-6 sm:space-y-5">
			<div>
				<h1 class="mb-4 text-3xl font-medium leading-6 text-gray-900">New Job</h1>
				<p class="max-w-2xl text-md text-gray-500">
					Give it a name, cron schedule and url to scrape.
					<span class="mt-2 block text-sm">
						Name should follow schema:
						<span class="font-light">Company/Department/Employee/...</span>
					</span>
				</p>
			</div>
			<div class="space-y-6 sm:space-y-5">
				<div
					class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
				>
					<label
						for="name"
						class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2"
					>
						Name
					</label>
					<div class="mt-1 sm:col-span-3 sm:mt-0">
						<input
							type="text"
							name="name"
							id="name"
							class="p-2 block w-full max-w-lg bg-gray-50 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:max-w-xs sm:text-sm"
						/>
					</div>
				</div>
				<div
					class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
				>
					<label
						for="filetype"
						class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2"
					>
						Filetype
					</label>
					<div class="mt-1 sm:col-span-3 sm:mt-0">
						<input
							type="text"
							name="filetype"
							id="filetype"
							class="p-2 block w-full max-w-lg bg-gray-50 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:max-w-xs sm:text-sm"
						/>
					</div>
				</div>
				<div
					class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
				>
					<label
						for="crontab"
						class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">Cron</label
					>
					<div class="mt-1 sm:col-span-3 sm:mt-0">
						<input
							type="text"
							name="crontab"
							id="crontab"
							bind:value={newJob.cron}
							class="p-2 inline w-full max-w-lg bg-gray-50 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:max-w-xs sm:text-sm"
						/>
						{#if newJob.cron === "* * * * *"}
							<label for="perMinute" class="sm:ml-2 text-gray-700 text-sm">
								<select
									name="perMinute"
									id="perMinute"
									value={1}
									class="p-2 pr-1 w-12 bg-gray-50 rounded-md border border-gray-200 shadow-sm text-right focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-700"
								>
									<option value={1}>1</option>
									<option value={2}>2</option>
									<option value={4}>4</option>
									<option value={6}>6</option>
									<option value={6}>12</option>
								</select>
								<span class="ml-1">per Minute</span>
							</label>
						{/if}
					</div>
				</div>
				<div
					class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
				>
					<label
						for="url"
						class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">Url</label
					>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<input
							type="text"
							name="url"
							id="url"
							class="p-2 block w-full bg-gray-50 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
						/>
					</div>
				</div>
				<div
					class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
				>
					{#if !showHeaders}
						<button
							on:click={() => (showHeaders = true)}
							class="text-blue-500 text-left">Add headers</button
						>
					{:else}
						<label
							for="headers"
							class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2"
						>
							Headers
							<span class="block text-sm font-light">JSON Object</span>
							<button
								on:click={() => (showHeaders = false)}
								class="mt-2 text-blue-500 text-left font-normal"
							>
								Remove headers
							</button>
						</label>
						<div class="mt-1 sm:col-span-2 sm:mt-0">
							<textarea
								name="headers"
								id="headers"
								rows="8"
								class="p-2 block w-full bg-gray-50 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
							/>
						</div>
					{/if}
				</div>
				<div
					class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
				>
					<label
						for="parser"
						class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2"
						>Parser</label
					>
					<div class="mt-1 sm:col-span-1 sm:mt-0">
						<select
							name="parser"
							id="parser"
							value=""
							class="p-2 block w-full bg-gray-50 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-700"
						>
							<option value="">none</option>
							{#each data.parsers as parser}
								<option value={parser}>{parser}</option>
							{/each}
						</select>
					</div>
				</div>
				<div
					class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
				>
					<label
						for="saveFile"
						class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2"
						>Save File</label
					>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<input type="checkbox" name="saveFile" id="saveFile" checked={true} />
					</div>
				</div>
				<div>
					<button
						class="mt-6 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
					>
						Create
					</button>
				</div>
			</div>
		</div>
	</div>
</form>
