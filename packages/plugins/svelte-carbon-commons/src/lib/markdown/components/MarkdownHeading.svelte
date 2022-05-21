<script lang="ts">
  import AnchorHeader from '$lib/text/AnchorHeader.svelte'
  import { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../marked'

  function generateHeaderId(value: string): string {
    return new marked.Slugger().slug(value)
  }

  export let token: marked.Tokens.Heading
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined

  let id: string
  $: id = generateHeaderId(token.text)
</script>

<AnchorHeader {id} depth={token.depth}>
  <slot />
</AnchorHeader>
