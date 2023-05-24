<script>
  import { Heading, Button, Table } from "$lib/components"
  export let data
</script>

<svelte:head>
  <title>Jobs | Scrapi</title>
</svelte:head>

<Heading title="Jobs" subtitle="Scheduled Jobs to scrape data">
  <Button href="/app/jobs/create">
    <svg viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
    New Job
  </Button>
</Heading>

<Table
  headers={[
    { key: "name", label: "Name" },
    { key: "crontab", label: "Crontab" },
    { key: "enabled", label: "Enabled" },
    { key: "open", label: "" },
  ]}
  rows={data.jobs}
>
  <div slot="cell" let:value let:row let:header>
    {#if header.key === "enabled"}
      {value ? "✅" : "❌"}
    {:else if header.key === "open"}
      <Button kind="secondary" href={`/app/jobs/${row.id}`}>Open</Button>
    {:else}
      {value}
    {/if}
  </div>
</Table>
