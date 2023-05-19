<script>
  export let label, name, value
</script>

<div class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
  <label for={name} class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">
    {label}
  </label>
  <div class="mt-1 sm:col-span-1 sm:mt-0">
    <select
      {name}
      id={name}
      bind:value
      class="p-2 block w-full rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-700"
    >
      qwe
      <slot />
    </select>
  </div>
</div>
