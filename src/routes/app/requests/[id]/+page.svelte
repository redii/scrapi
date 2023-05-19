<script>
  import { Heading, DisplayData, DisplayText } from "$lib/components"
  export let data
</script>

<svelte:head>
  <title>{data.request.job.name} - {data.request.createdAt.toLocaleString("de")} | Scrapi</title>
</svelte:head>

<Heading
  title={data.request.job.name}
  subtitle={`Created on ${data.request.createdAt.toLocaleString("de")}`}
/>

<DisplayData>
  <DisplayText
    label="Job"
    value={data.request.job.name}
    href={`/app/jobs/${data.request.job.id}`}
  />
  <DisplayText label="Date" value={data.request.createdAt.toLocaleString("de")} />
</DisplayData>

{#if data.fileContent}
  <DisplayData title="File Content">
    <pre class="px-4 py-6 sm:gap-4 sm:px-6 overflow-x-scroll text-sm">
      {data.fileContent}
    </pre>
  </DisplayData>
{/if}
