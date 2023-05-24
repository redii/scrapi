<script>
  import slugify from "@sindresorhus/slugify"

  import {
    Heading,
    Button,
    Form,
    TextInput,
    Checkbox,
    Select,
    SelectItem,
    Textarea,
    ParserInput,
    ParserItem,
  } from "$lib/components"

  export let data

  $: job = data.job
  $: showHeaders = Boolean(data.job.headers)

  function slugifyName() {
    job.name = slugify(job.name, {
      lowercase: false,
      preserveCharacters: ["/"],
    })
  }
</script>

<svelte:head>
  <title>Edit {job.name} | Scrapi</title>
</svelte:head>

<Heading title={job.name} createdOn={job.createdAt}>
  <form method="POST" action="?/delete">
    <Button kind="danger" size="lg" type="submit">Delete</Button>
  </form>
</Heading>

<Form action="?/update">
  <TextInput label="Name" name="name" bind:value={job.name} oninput={slugifyName} />
  <TextInput label="Crontab" name="crontab" value={job.crontab} />
  <TextInput label="URL" name="url" value={job.url} />
  <Select label="HTTP Method" name="httpMethod" bind:value={job.httpMethod}>
    <SelectItem value="GET">GET</SelectItem>
    <SelectItem value="POST">POST</SelectItem>
  </Select>
  {#if job.httpMethod === "POST"}
    <Textarea label="POST Data" name="postData" value={job.postData} />
  {/if}
  <Textarea
    label="Headers"
    name="headers"
    jsonInfo={true}
    togglable={true}
    openLabel="Add headers"
    closeLabel="Remove headers"
    value={job.headers}
  />
  <ParserInput>
    {#each job.parsers as parser}
      <ParserItem {...parser} />
    {/each}
    <ParserItem />
  </ParserInput>
  <Checkbox label="Save File" name="saveFile" value={job.saveFile} />
  <Checkbox label="Enabled" name="enabled" value={job.enabled} />
  <br />
  <Button type="submit">Save</Button>
</Form>
