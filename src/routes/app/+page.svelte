<script>
  import { Heading, Table, Button, Link, Stats } from "$lib/components"

  export let data
</script>

<svelte:head>
  <title>Dashboard | Scrapi</title>
</svelte:head>

<Heading title="Scrapi Dashboard" />

<Stats
  sm={2}
  md={4}
  data={[
    { label: "Active Jobs", value: data.jobCount },
    { label: "Total Requests", value: data.requestCountTotal },
    { label: "Requests last 7 Days", value: data.requestCountLast7Days },
  ]}
/>

<Table
  title="Latest Requests"
  headers={[
    { key: "createdAt", label: "Created at" },
    { key: "job.name", label: "Job Name" },
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
    {:else if header.key === "job.name"}
      <Link href={`/app/jobs/${row.job.id}`}>{value}</Link>
    {:else if header.key === "createdAt"}
      {value.toLocaleString("de")}
    {:else}
      {value}
    {/if}
  </div>
</Table>
