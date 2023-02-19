<script>
	import { page } from "$app/stores"

	/** @type {import('./$types').PageData} */
	export let data

	$: pageNumber = Number($page.url.searchParams.get("page")) || 0
</script>

<svelte:head>
	<title>Scraper > Files</title>
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
							<th
								scope="col"
								class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
							>
								Job
							</th>
							<th
								scope="col"
								class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
							>
								Date
							</th>
							<th
								scope="col"
								class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
							>
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
										<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
										</svg>
									</a>
								</td>
								<td
									class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
								>
									<a
										href={`/app/files/${file.id}`}
										class="py-[7px] px-4 text-blue-600 border border-blue-600 rounded-md hover:bg-gray-50 duration-200"
									>
										Edit
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
				<div
					class="w-full p-4 bg-gray-50 border-t border-gray-300 flex flex-row justify-between"
				>
					<a
						href={pageNumber === 0 ? "#" : `/app/files?page=${pageNumber - 1}`}
						class:text-gray-400={pageNumber === 0}
					>
						<!-- prettier-ignore -->
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
						</svg>
					</a>
					<span class="text-gray-600">
						Page {pageNumber + 1} of {Math.ceil(data.total / 10)}
					</span>
					<!-- prettier-ignore -->
					<a href={pageNumber + 1 === Math.ceil(data.total / 10) ? "#" : `/app/files?page=${pageNumber + 1}`} class:text-gray-400={pageNumber + 1 === Math.ceil(data.total / 10)}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
