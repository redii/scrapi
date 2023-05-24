<script>
  export let label,
    name,
    value,
    oninput = () => {}
</script>

<div class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
  <label for="name" class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">{label}</label>
  <div class="mt-1 sm:col-span-3 sm:mt-0">
    <input
      type="text"
      {name}
      id={name}
      bind:value
      on:input={oninput}
      class="p-2 block w-full max-w-lg rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:max-w-xs sm:text-sm"
    />
  </div>
</div>
