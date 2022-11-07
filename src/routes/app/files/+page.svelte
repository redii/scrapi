<script>
	/** @type {import('./$types').PageData} */
	export let data
</script>

<svelte:head>
	<title>Scraper: Files</title>
</svelte:head>

<div class="sm:flex sm:items-center">
	<div class="sm:flex-auto">
		<h1 class="text-3xl font-semibold text-gray-900">Files</h1>
		<p class="mt-2 text-sm text-gray-700">Scraped and stored data</p>
	</div>
</div>
<div class="mt-8 flex flex-col">
	<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
		<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
			<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
				<table class="min-w-full divide-y divide-gray-300">
					<thead class="bg-gray-50">
						<tr>
							<th
								scope="col"
								class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
							>
								ID
							</th>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
								Job
							</th>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
								Date
							</th>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
								File
							</th>
							<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
								<span class="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200 bg-white">
						{#each data.files as file}
							<tr>
								<td
									class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
								>
									{file.id}
								</td>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
									{file.job.name}
								</td>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
									{file.createdAt.toLocaleString("de")}
								</td>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
									<!-- prettier-ignore -->
									<a
										href={`/api/file/${file.id}?token=${import.meta.env.VITE_SCRAPE_TOKEN}`}
										class="text-blue-500"
										target="_blank"
										rel="noreferrer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-6 h-6"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
											/>
										</svg>
									</a>
								</td>
								<td
									class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
								>
									<a href={`/app/files/${file.id}`} class="text-blue-600 hover:text-blue-900">
										Open
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
