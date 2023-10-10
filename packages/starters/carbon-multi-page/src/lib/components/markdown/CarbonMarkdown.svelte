<script lang="ts">
  import { base } from '$app/paths'
  import MarkdownCode from './code/MarkdownCode.svelte'
  import MarkdownCodeSpan from './code/MarkdownCodeSpan.svelte'
  import MarkdownBloquote from './text/MarkdownBloquote.svelte'
  import MarkdownLink from './text/MarkdownLink.svelte'
  import MarkdownParagraph from './text/MarkdownParagraph.svelte'
  import MarkdownTable from './table/MarkdownTable.svelte'
  import MarkdownList from './list/MarkdownList.svelte'
  import MarkdownListItem from './list/MarkdownListItem.svelte'
  import MarkdownNotification from './containers/notification/MarkdownNotification.svelte'
  import MarkdownTabs from './containers/tabs/MarkdownTabs.svelte'
  import MarkdownTags from './containers/tags/MarkdownTags.svelte'
  import MarkdownHeading from './text/MarkdownHeading.svelte'
  import Markdown from '@magidoc/plugin-svelte-marked'

  export let source: string | undefined | null

  const castedBase = base as `/${string}`
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
      tabs: MarkdownTabs,
      notification: MarkdownNotification,
      tags: MarkdownTags,
    }}
    options={{
      baseUrl: castedBase,
    }}
  />
{/if}
