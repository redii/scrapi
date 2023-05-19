<script>
  import { Heading, Form, TextInput, Select, SelectItem, Checkbox, Button } from "$lib/components"

  export let data

  $: newJob = {}
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
  <div
    class="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
  >
    {#if !showHeaders}
      <button on:click={() => (showHeaders = true)} class="text-blue-500 text-left">
        Add headers
      </button>
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
      <div class="mt-1 sm:col-span-2 sm:mt-0">
        <textarea
          name="headers"
          id="headers"
          rows="8"
          class="p-2 block w-full rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
    {/if}
  </div>
  <Select label="Parser" name="parser" value="">
    <SelectItem value="">none</SelectItem>
    {#each data.parsers as parser}
      <SelectItem value={parser}>{parser}</SelectItem>
    {/each}
  </Select>
  <Checkbox label="Save File" name="saveFile" value={true} />
  <br />
  <Button type="submit">Create</Button>
</Form>
