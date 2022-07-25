<script lang="ts">
  import { generatePathSegment } from '$lib/utils/url'

  import type { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../markedConfiguration'

  export let token: marked.Tokens.Heading
  export let options: MarkdownOptions
  export const renderers: Renderers = undefined

  let id: string | undefined
  $: id = generatePathSegment(token.text, options.slugger)
</script>

<svelte:element this={`h${token.depth}`} {id}>
  <slot />
</svelte:element>
