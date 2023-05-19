<script>
  import { Heading, DisplayData, DisplayText } from "$lib/components"

  export let data
</script>

<svelte:head>
  <title>Settings | Scrapi</title>
</svelte:head>

<Heading title="Settings" />

<DisplayData>
  <DisplayText label="Files Path" value={data.filesPath} />
</DisplayData>
