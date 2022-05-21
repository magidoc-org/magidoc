<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'
  import type { Renderers } from 'svelte-markdown'
  import MarkdownBloquote from './MarkdownBloquote.svelte'
  import MarkdownCode from './MarkdownCode.svelte'
  import MarkdownLink from './MarkdownLink.svelte'
  import MarkdownParagraph from './MarkdownParagraph.svelte'
  import MarkdownTable from './table/MarkdownTable.svelte'
  import MarkdownTableHead from './table/MarkdownTableHead.svelte'
  import MarkdownTableBody from './table/MarkdownTableBody.svelte'
  import MarkdownTableRow from './table/MarkdownTableRow.svelte'
  import MarkdownTableCell from './table/MarkdownTableCell.svelte'
  import MarkdownHeading from './MarkdownHeading.svelte'
  import MarkdownList from './list/MarkdownList.svelte'
  import MarkdownListItem from './list/MarkdownListItem.svelte'
  import MarkdownCodeSpan from './MarkdownCodeSpan.svelte'

  /**
   * The markdown source
   */
  export let source: string

  /**
   * The base path to your application.
   * This is required when the application does not run in root context to generate the links properly.
   */
  export let base: `/${string}`

  /**
   * Optional renderers that can overwrite the default ones.
   */
  export let renderers: Partial<Renderers> = {}
</script>

<SvelteMarkdown
  {source}
  renderers={{
    link: MarkdownLink,
    code: MarkdownCode,
    blockquote: MarkdownBloquote,
    paragraph: MarkdownParagraph,
    table: MarkdownTable,
    tablehead: MarkdownTableHead,
    tablebody: MarkdownTableBody,
    tablerow: MarkdownTableRow,
    tablecell: MarkdownTableCell,
    heading: MarkdownHeading,
    list: MarkdownList,
    listitem: MarkdownListItem,
    codespan: MarkdownCodeSpan,
    ...renderers,
  }}
  options={{
    baseUrl: base,
  }}
/>
