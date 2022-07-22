<script lang="ts">
  import '@magidoc/plugin-svelte-prismjs'
  import 'prismjs/components/prism-graphql.js'
  import 'prismjs/components/prism-json.js'
  import 'prismjs/components/prism-shell-session.js'
  import 'prismjs/components/prism-javascript.js'
  import 'prismjs/components/prism-typescript.js'
  import 'prismjs/components/prism-python.js'
  import 'prismjs/components/prism-yaml.js'
  import 'prismjs/components/prism-bash.js'
  import 'prismjs/components/prism-csharp.js'
  import 'prismjs/components/prism-kotlin.js'
  import 'prismjs/components/prism-java.js'
  import 'prismjs/components/prism-markdown.js'
  import 'prism-svelte'
  import { base } from '$app/paths'
  import MarkdownCode from './code/MarkdownCode.svelte'
  import MarkdownCodeSpan from './code/MarkdownCodeSpan.svelte'
  import { setupMarkedExtensions } from './setupMarked'
  import MarkdownBloquote from './text/MarkdownBloquote.svelte'
  import MarkdownLink from './text/MarkdownLink.svelte'
  import MarkdownParagraph from './text/MarkdownParagraph.svelte'
  import MarkdownTable from './table/MarkdownTable.svelte'
  import MarkdownList from './list/MarkdownList.svelte'
  import MarkdownListItem from './list/MarkdownListItem.svelte'
  import MarkdownNotification from './containers/notification/MarkdownNotification.svelte'
  import MarkdownTags from './containers/tags/MarkdownTags.svelte'
  import MarkdownHeading from './text/MarkdownHeading.svelte'
  import Markdown from '@magidoc/plugin-svelte-marked'

  setupMarkedExtensions()

  export let source: string | undefined | null
</script>

{#if source}
  <Markdown
    {source}
    renderers={{
      heading: MarkdownHeading,
      code: MarkdownCode,
      codespan: MarkdownCodeSpan,
      blockquote: MarkdownBloquote,
      link: MarkdownLink,
      paragraph: MarkdownParagraph,
      table: MarkdownTable,
      list: MarkdownList,
      list_item: MarkdownListItem,
      notification: MarkdownNotification,
      tags: MarkdownTags,
    }}
    options={{
      baseUrl: base,
    }}
  />
{/if}
