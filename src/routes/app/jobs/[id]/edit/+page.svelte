<script>
  import slugify from "@sindresorhus/slugify"

  import {
    Heading,
    Button,
    Form,
    TextInput,
    Checkbox,
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
  <div
    class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
  >
    {#if !showHeaders}
      <button on:click={() => (showHeaders = true)} class="text-blue-500 text-left">
        Add headers
      </button>
      <input type="hidden" name="headers" value="" />
    {:else}
      <label for="headers" class="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">
        Headers
        <span class="block text-sm font-light">JSON Object</span>
        <button
          on:click={() => (showHeaders = false)}
          class="mt-2 text-blue-500 text-left font-normal"
        >
          Remove headers
        </button>
      </label>
      <div class="mt-1 sm:col-span-3 lg:col-span-2 sm:mt-0">
        <textarea
          name="headers"
          id="headers"
          rows="10"
          value={job.headers}
          class="p-2 block w-full rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
    {/if}
  </div>
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
