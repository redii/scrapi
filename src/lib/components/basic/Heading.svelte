<script>
  export let title = "title missing",
    subtitle = ""
</script>

<div class="flex flex-col md:flex-row gap-4 justify-between md:items-end">
  <div class="prose md:prose-lg">
    <h1 class="!mb-0">{title}</h1>
    {#if subtitle}
      <p class="!mt-2 md:!mt-4">{subtitle}</p>
    {/if}
  </div>
  <div class="flex flex-row gap-2">
    <slot />
  </div>
</div>
