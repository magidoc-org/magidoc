<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'
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

  export let source: string
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
  }}
/>
