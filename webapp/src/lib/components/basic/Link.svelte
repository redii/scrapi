<script>
  import { onMount } from "svelte"

  export let href = "#",
    target,
    showIcon = false,
    download = false

  let element

  onMount(() => {
    if (download) element.download = download
  })
</script>

<a class="text-blue-500 underline underline-offset-4" {href} {target} bind:this={element}>
  <slot />
  {#if showIcon}
    <!-- prettier-ignore -->
    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 align-text-top inline">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  {/if}
</a>
