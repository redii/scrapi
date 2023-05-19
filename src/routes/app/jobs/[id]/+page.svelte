<script>
  import { Heading, Button, Stats, DisplayData, DisplayText, Table, Link } from "$lib/components"

  export let data

  const job = data.job
  const daysSinceCreation = Math.ceil(
    (new Date().getTime() - job.createdAt.getTime()) / (1000 * 3600 * 24)
  )
</script>

<svelte:head>
  <title>{job.name} | Scrapi</title>
</svelte:head>

<Heading title={job.name} subtitle={`Last update on ${job.updatedAt.toLocaleString("de")}`}>
  <div>
    <Button size="lg" href={`/app/jobs/${job.id}/edit`}>Edit job</Button>
  </div>
</Heading>

<Stats
  data={[
    { label: "Total Requests", value: data.requestCountTotal },
    { label: "Requests last 24 Hours", value: data.requestCountLastDay },
    { label: "Running for", value: `${daysSinceCreation} days` },
  ]}
/>

<DisplayData>
  <DisplayText label="Name" value={job.name} />
  <DisplayText label="Crontab" value={job.crontab} />
  <DisplayText label="URL" value={job.url} />
</DisplayData>

<Table
  title="Latest Requests"
  headers={[
    { key: "createdAt", label: "Date" },
    { key: "id", label: "ID" },
    { key: "file", label: "File" },
    { key: "open", label: "" },
  ]}
  rows={data.latestRequests}
>
  <div slot="cell" let:value let:row let:header>
    {#if header.key === "open"}
      <Button kind="secondary" href={`/app/requests/${row.id}`}>Open</Button>
    {:else if header.key === "file"}
      {#if row.fileSaved}
        <Link href={`/api/file/${row.id}`} download={row.id}>
          <!-- prettier-ignore -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </Link>
      {/if}
    {:else if header.key === "createdAt"}
      {value.toLocaleString("de")}
    {:else}
      {value}
    {/if}
  </div>
</Table>
