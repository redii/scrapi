<script>
  export let title,
    data = []
</script>

<div>
  {#if title}<p class="text-2xl font-semibold leading-6 text-gray-900 mb-4">{title}</p>{/if}
  <dl class={"grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"} class:mt-5={title}>
    {#each data as stat}
      <div class="overflow-hidden rounded-lg bg-white px-4 py-5 sm:p-6 shadow">
        <dt class="truncate text-sm font-medium text-gray-500">{stat.label}</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
      </div>
    {/each}
  </dl>
</div>
