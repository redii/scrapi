<script>
	/** @type {import('./$types').PageData} */
	export let data
</script>

<svelte:head>
	<title>Scraper: Jobs</title>
</svelte:head>

<div class="sm:flex sm:items-center">
	<div class="sm:flex-auto">
		<h1 class="text-3xl font-semibold text-gray-900">Jobs</h1>
		<p class="mt-2 text-sm text-gray-700">All currently enabled and paused jobs</p>
	</div>
	<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
		<a
			href="/app/jobs/create"
			class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:w-auto duration-200"
		>
			Add job
		</a>
	</div>
</div>
<div class="mt-8 flex flex-col">
	<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
		<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
			<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
				<table class="min-w-full divide-y divide-gray-300">
					<thead class="bg-gray-50">
						<tr>
							<th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Enabled</th>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Crontab</th>
							<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
								<span class="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200 bg-white">
						{#each data.jobs as job}
							<tr>
								<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
									{job.id}
								</td>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
									{job.enabled ? "✅" : "❌"}
								</td>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
									{job.name}
								</td>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
									{job.filetype}
								</td>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
									{job.crontab}
								</td>
								<td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
									<a
										href={`/app/jobs/${job.id}`}
										class="py-[7px] px-4 text-blue-600 border border-blue-600 rounded-md hover:bg-gray-50 duration-200"
									>
										Edit
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
