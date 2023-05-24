<script>
  export let label,
    name,
    value,
    jsonInfo = false,
    togglable = false,
    openLabel,
    closeLabel

  $: open = value || togglable === false
</script>

<div class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
  {#if !open}
    <button on:click|preventDefault={() => (open = true)} class="text-blue-500 text-left">
      {openLabel}
    </button>
    <input type="hidden" {name} value="" />
  {:else}
    <label for={name} class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">
      {label}
      {#if jsonInfo}
        <span class="block text-sm font-light">JSON Object</span>
      {/if}
      {#if togglable}
        <button
          on:click|preventDefault={() => (open = false)}
          class="mt-2 text-blue-500 text-left font-normal"
        >
          {closeLabel}
        </button>
      {/if}
    </label>
    <div class="mt-1 sm:col-span-2 sm:mt-0">
      <textarea
        {name}
        id={name}
        rows="8"
        bind:value
        class="p-2 block w-full rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
    </div>
  {/if}
</div>
