<script>
  import { Button, Modal, Form, TextInput, CodeEditor, Link } from "$lib/components"

  export let id,
    name,
    webhookUrl,
    code = `function parser(rawData, job, request) {
  const data = JSON.parse(rawData)
  // Analyze the Data...
  // Notify if something happens...
  got.post("https://ntfy.sh/my-scrapi", { body: "Something happend" })
}`

  $: open = false
</script>

<div class="px-4 py-2 bg-white rounded-lg shadow">
  {#if id}
    <div class="flex flex-row gap-2 justify-between items-center">
      <span>{name}</span>
      <Button kind="secondary" onclick={() => (open = !open)}>Edit</Button>
    </div>
  {:else}
    <button on:click|preventDefault={() => (open = !open)} class="text-center text-blue-500 w-full">
      New Parser
      <!-- prettier-ignore -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline relative bottom-[2px]">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    </button>
  {/if}
</div>
<Modal bind:open>
  <Form action="?/parser-update">
    <div class="flex flex-col gap-8">
      <div class="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <span class="text-2xl font-semibold">{name ? `Edit ${name}` : "New Parser"}</span>
        <div class="flex gap-2">
          <Button kind="secondary" onclick={() => (open = !open)}>Cancel</Button>
          <Button kind="primary" type="submit">Save</Button>
        </div>
      </div>

      {#if id}<input type="hidden" name="id" value={id} />{/if}
      <TextInput label="Name" name="name" value={name} />

      <div>
        <hr class="mb-6" />
        <CodeEditor bind:code />
        <input type="hidden" name="code" bind:value={code} />
        <span class="block mt-2 text-sm text-gray-500">
          More about parsers and how to use them can be found <Link href="#">here</Link>
        </span>
      </div>
    </div>
  </Form>
</Modal>
