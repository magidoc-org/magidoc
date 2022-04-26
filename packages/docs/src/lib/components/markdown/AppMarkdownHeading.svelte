<script lang="ts">
  import { MarkdownHeading } from '@magidoc/plugin-svelte-carbon-commons'

  export let text: string
  export let depth: number
</script>

<MarkdownHeading {text} {depth} showAnchor>
  <slot />
</MarkdownHeading>
