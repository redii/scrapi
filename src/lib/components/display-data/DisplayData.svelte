<script>
  export let title
</script>

<div>
  {#if title}<p class="text-2xl font-semibold leading-6 text-gray-900 mb-4">{title}</p>{/if}
  <div class="overflow-hidden bg-white shadow rounded-lg">
    <div class="border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <slot />
      </dl>
    </div>
  </div>
</div>
