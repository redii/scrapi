<script>
  export let action
</script>

<form class="grow space-y-8 divide-y divide-gray-200" method="POST" {action}>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div class="space-y-6 sm:space-y-5">
      <slot />
    </div>
  </div>
</form>
