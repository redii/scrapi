<script>
	/** @type {import('./$types').PageData} */
	export let data
</script>

<svelte:head>
	<title>Scraper: {data.file.job.name} - {data.file.createdAt.toLocaleString("de")}</title>
</svelte:head>

<div class="space-y-8 divide-y divide-gray-200">
	<div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
		<div class="space-y-6 sm:space-y-5">
			<div class="flex flex-col md:flex-row justify-between items-center">
				<div>
					<h3 class="mb-5 text-3xl font-medium leading-6 text-gray-900">
						{data.file.job.name}
					</h3>
					<p class="mb-5 max-w-2xl text-sm text-gray-500">
						Created on {data.file.createdAt.toLocaleString("de")}
					</p>
				</div>
				<form method="POST" action="?/delete">
					<button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
						Delete
					</button>
				</form>
			</div>
			<div class="space-y-6 sm:space-y-5">
				<div
					class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
				>
					<label for="name" class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2"
						>Job</label
					>
					<div class="mt-1 sm:col-span-3 sm:mt-0">
						<input
							type="text"
							name="name"
							id="name"
							value={data.file.job.name}
							disabled
							class="p-2 block w-full max-w-lg bg-gray-50 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:max-w-xs sm:text-sm"
						/>
					</div>
				</div>
				<div
					class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
				>
					<label for="createdAt" class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">
						Datetime
					</label>
					<div class="mt-1 sm:col-span-3 sm:mt-0">
						<input
							type="text"
							name="createdAt"
							id="createdAt"
							value={data.file.createdAt.toLocaleString("de")}
							disabled
							class="p-2 block w-full max-w-lg bg-gray-50 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:max-w-xs sm:text-sm"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
