<script>
  export let kind = "info"

  const classes = {
    info: "bg-blue-100 text-blue-800 rounded-md p-3",
    success: "bg-green-100 text-green-800 rounded-md p-3",
    warning: "bg-yellow-100 text-yellow-800 rounded-md p-3",
    danger: "bg-red-100 text-red-800 rounded-md p-3",
  }
</script>

<div class={classes[kind]}>
  <div class="flex">
    <div class="flex-shrink-0">
      <slot name="icon" />
    </div>
    <div class="ml-3">
      <slot />
    </div>
  </div>
</div>
