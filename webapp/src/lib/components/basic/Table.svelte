<script>
  import { page } from "$app/stores"

  $: pageNumber = Number($page.url.searchParams.get("page")) || 0

  export let title,
    headers = [],
    rows = [],
    total = 0

  function get(obj, path) {
    var schema = obj
    var pList = path.split(".")
    var len = pList.length
    for (var i = 0; i < len - 1; i++) {
      var elem = pList[i]
      if (!schema[elem]) schema[elem] = {}
      schema = schema[elem]
    }
    return schema[pList[len - 1]]
  }
</script>

<div class="flow-root">
  {#if title}<p class="text-2xl font-semibold leading-6 text-gray-900 mb-4">{title}</p>{/if}
  <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              {#each headers as header, index}
                <th
                  scope="col"
                  class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  class:pl-4={!index}
                  class:sm:pl-6={!index}
                  class:pr-4={index + 1 === headers.length}
                  class:sm:pr-6={index + 1 === headers.length}
                >
                  {header.label}
                </th>
              {/each}
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            {#each rows as row}
              <tr>
                {#each headers as header, index}
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"
                    class:font-semibold={!index}
                    class:pl-4={!index}
                    class:sm:pl-6={!index}
                    class:pr-4={index + 1 === headers.length}
                    class:sm:pr-6={index + 1 === headers.length}
                    class:text-right={index + 1 === headers.length}
                  >
                    <slot name="cell" value={get(row, header.key)} {row} {header}>
                      {get(row, header.key)}
                    </slot>
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>

        {#if total}
          <div class="w-full p-4 bg-gray-50 border-t border-gray-300 flex flex-row justify-between">
            <a
              href={pageNumber === 0 ? "#" : `/app/requests?page=${pageNumber - 1}`}
              class:text-gray-400={pageNumber === 0}
            >
              <!-- prettier-ignore -->
              <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </a>
            <span class="text-gray-600">
              Page {pageNumber + 1} of {Math.ceil(total / 10)}
            </span>
            <!-- prettier-ignore -->
            <a href={pageNumber + 1 === Math.ceil(total / 10) ? "#" : `/app/requests?page=${pageNumber + 1}`} class:text-gray-400={pageNumber + 1 === Math.ceil(total / 10)}>
              <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </a>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
