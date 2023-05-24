<script>
  export let size = "md",
    kind = "primary",
    type = "button",
    href = "#",
    onclick = () => console.log("clicked")

  const classes = {
    primary: {
      xs: "inline-block rounded bg-blue-500 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 duration-200",
      sm: "inline-block rounded bg-blue-500 px-3 py-1 text-md font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 duration-200",
      md: "inline-block rounded-md bg-blue-500 px-3.5 py-1.5 text-md font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 duration-200",
      lg: "inline-block rounded-md bg-blue-500 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 duration-200",
      xl: "inline-block rounded-md bg-blue-500 px-4.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 duration-200",
    },
    secondary: {
      xs: "inline-block rounded bg-white px-2.5 py-1 text-sm font-semibold text-blue-500 shadow-sm ring-1 ring-inset ring-blue-500 hover:bg-gray-50 duration-200",
      sm: "inline-block rounded bg-white px-3 py-1 text-md font-semibold text-blue-500 shadow-sm ring-1 ring-inset ring-blue-500 hover:bg-gray-50 duration-200",
      md: "inline-block rounded-md bg-white px-3.5 py-1.5 text-md font-semibold text-blue-500 shadow-sm ring-1 ring-inset ring-blue-500 hover:bg-gray-50 duration-200",
      lg: "inline-block rounded-md bg-white px-4 py-2 text-lg font-semibold text-blue-500 shadow-sm ring-1 ring-inset ring-blue-500 hover:bg-gray-50 duration-200",
      xl: "inline-block rounded-md bg-white px-4.5 py-2.5 text-lg font-semibold text-blue-500 shadow-sm ring-1 ring-inset ring-blue-500 hover:bg-gray-50 duration-200",
    },
    soft: {
      xs: "inline-block rounded bg-blue-100 px-2.5 py-1 text-sm font-semibold text-blue-500 shadow-sm hover:bg-blue-100 duration-200",
      sm: "inline-block rounded bg-blue-100 px-3 py-1 text-md font-semibold text-blue-500 shadow-sm hover:bg-blue-100 duration-200",
      md: "inline-block rounded-md bg-blue-100 px-3.5 py-1.5 text-md font-semibold text-blue-500 shadow-sm hover:bg-blue-100 duration-200",
      lg: "inline-block rounded-md bg-blue-100 px-4 py-2 text-lg font-semibold text-blue-500 shadow-sm hover:bg-blue-100 duration-200",
      xl: "inline-block rounded-md bg-blue-100 px-4.5 py-2.5 text-lg font-semibold text-blue-500 shadow-sm hover:bg-blue-100 duration-200",
    },
    danger: {
      xs: "inline-block rounded bg-red-500 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 duration-200",
      sm: "inline-block rounded bg-red-500 px-3 py-1 text-md font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 duration-200",
      md: "inline-block rounded-md bg-red-500 px-3.5 py-1.5 text-md font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 duration-200",
      lg: "inline-block rounded-md bg-red-500 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 duration-200",
      xl: "inline-block rounded-md bg-red-500 px-4.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 duration-200",
    },
  }
</script>

{#if href !== "#"}
  <a {href} class={classes[kind][size]}>
    <slot />
  </a>
{:else}
  <button {type} class={classes[kind][size]} on:click={onclick}>
    <slot />
  </button>
{/if}
