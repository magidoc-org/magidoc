<script lang="ts">
  import type { marked } from 'marked'
  import {
    contextKey,
    type MarkdownOptions,
    type Renderers,
  } from '../markedConfiguration'
  import { getContext } from 'svelte/types/runtime/internal/lifecycle'
  import type { Slugger } from 'marked'

  export let token: marked.Tokens.Heading
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined

  const { slug } = getContext<{ slug: Slugger }>(contextKey)

  let id: string
  $: id = slug.slug(token.text)
</script>

<svelte:element this={`h${token.depth}`} {id} />
