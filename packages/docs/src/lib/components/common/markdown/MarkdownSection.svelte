<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'
  import MarkdownBloquote from './MarkdownBloquote.svelte'
  import MarkdownCode from './MarkdownCode.svelte'
  import MarkdownLink from './MarkdownLink.svelte'
  import MarkdownParagraph from './MarkdownParagraph.svelte'

  export let source: string
</script>

<SvelteMarkdown
  {source}
  renderers={{
    link: MarkdownLink,
    code: MarkdownCode,
    blockquote: MarkdownBloquote,
    paragraph: MarkdownParagraph,
  }}
/>
