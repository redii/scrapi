<script>
  import {
    Heading,
    Form,
    TextInput,
    Select,
    SelectItem,
    Textarea,
    Checkbox,
    Button,
  } from "$lib/components"

  export let data

  let httpMethod = "GET"

  $: showHeaders = false
</script>

<svelte:head>
  <title>Create Job | Scrapi</title>
</svelte:head>

<Heading title="New Job" subtitle="Give it a name, cron schedule and url to scrape." />

<Form>
  <TextInput label="Name" name="name" />
  <TextInput label="Crontab" name="crontab" />
  <TextInput label="Url" name="url" />
  <Select label="HTTP Method" name="httpMethod" bind:value={httpMethod}>
    <SelectItem value="GET">GET</SelectItem>
    <SelectItem value="POST">POST</SelectItem>
  </Select>
  {#if httpMethod === "POST"}
    <Textarea label="POST Data" name="postData" />
  {/if}
  <Textarea
    label="Headers"
    name="headers"
    jsonInfo={true}
    togglable={true}
    openLabel="Add headers"
    closeLabel="Remove headers"
  />
  <Checkbox label="Save File" name="saveFile" value={true} />
  <br />
  <Button type="submit">Create</Button>
</Form>
