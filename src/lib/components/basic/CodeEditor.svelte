<script>
  import CodeMirror from "svelte-codemirror-editor"
  import { javascript } from "@codemirror/lang-javascript"

  export let code = ""
</script>

<div class="bg-white border border-gray-200">
  <CodeMirror bind:value={code} lang={javascript()} />
</div>
