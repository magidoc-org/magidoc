<script lang="ts">
  import Markdown from '@magidoc/plugin-svelte-marked'

  export let source: string
</script>

<Markdown
  {source}
  renderers={{
    code: MarkdownCode,
  }}
/>
