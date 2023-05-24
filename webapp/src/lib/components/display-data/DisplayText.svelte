<script>
  import { Link } from "$lib/components"

  export let label, value, href
</script>

<div class="px-4 py-6 sm:gap-4 sm:px-6 sm:grid sm:grid-cols-3">
  <dt class="text-sm font-medium leading-6 text-gray-900">{label}</dt>
  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
    {#if href}
      <Link {href} showIcon={true}>{value}</Link>
    {:else}
      {value}
    {/if}
  </dd>
</div>
