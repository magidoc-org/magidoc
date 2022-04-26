<script lang="ts">
  import { base } from '$app/paths'

  import { MarkdownLink } from '@magidoc/plugin-svelte-carbon-commons'

  export let href: string
</script>

<MarkdownLink href={base === '/' ? href : `${base}/${href}`} />
