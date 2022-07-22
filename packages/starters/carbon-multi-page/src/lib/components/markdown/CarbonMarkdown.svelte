<script lang="ts">
  import Markdown from '@magidoc/plugin-svelte-marked'
  import { base } from '$app/paths'
  import MarkdownCode from './code/MarkdownCode.svelte'
  import MarkdownCodeSpan from './code/MarkdownCodeSpan.svelte'
  export let source: string | undefined
</script>

{#if source}
  <Markdown
    {source}
    renderers={{
      code: MarkdownCode,
      codespan: MarkdownCodeSpan,
    }}
    options={{
      baseUrl: base,
    }}
  />
{/if}
