<script>
  export let label, name, value
</script>

<div class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
  <label for={name} class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">
    {label}
  </label>
  <div class="mt-1 sm:col-span-2 sm:mt-0">
    <input type="checkbox" {name} id={name} bind:value bind:checked={value} />
  </div>
</div>
