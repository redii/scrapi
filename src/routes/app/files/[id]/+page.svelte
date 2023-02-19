<script>
	/** @type {import('./$types').PageData} */
	export let data
</script>

<svelte:head>
	<title>Scraper > {data.file.job.name} - {data.file.createdAt.toLocaleString("de")}</title>
</svelte:head>

<div class="space-y-8 divide-y divide-gray-200">
	<div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
		<div class="space-y-6 sm:space-y-5">
			<div class="flex flex-col md:flex-row justify-between items-center overflow-x-scroll">
				<div class="w-full">
					<h1 class="mb-4 text-3xl font-medium leading-6 text-gray-900">
						{data.file.job.name}
					</h1>
					<p class="max-w-2xl text-sm text-gray-500">
						Created on {data.file.createdAt.toLocaleString("de")}
					</p>
				</div>
				<div class="w-full md:w-fit">
					<form method="POST" action="?/delete">
						<button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
							Delete
						</button>
					</form>
				</div>
			</div>
			<div class="space-y-6 sm:space-y-5">
				<div
					class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
				>
					<label
						for="name"
						class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2"
					>
						Job
					</label>
					<div class="mt-1 sm:col-span-3 sm:mt-0">
						<input
							type="text"
							name="name"
							id="name"
							value={data.file.job.name}
							disabled
							class="bg-white p-2 inline mb-4 lg:mb-0 w-full max-w-lg rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:max-w-xs sm:text-sm"
						/>
						<a
							href={`/app/jobs/${data.file.job.id}`}
							class="px-4 py-2 lg:ml-2 relative top-[1px] text-blue-600 border border-blue-600 rounded-md hover:bg-gray-50 duration-200"
						>
							Open
						</a>
					</div>
				</div>
				<div
					class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
				>
					<label
						for="createdAt"
						class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2"
					>
						Datetime
					</label>
					<div class="mt-1 sm:col-span-3 sm:mt-0">
						<input
							type="text"
							name="createdAt"
							id="createdAt"
							value={data.file.createdAt.toLocaleString("de")}
							disabled
							class="bg-white p-2 block w-full max-w-lg rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:max-w-xs sm:text-sm"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
