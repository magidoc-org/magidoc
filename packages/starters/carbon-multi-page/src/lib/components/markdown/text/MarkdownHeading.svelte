<script lang="ts">
  import type { marked } from 'marked'
  import { getContext } from 'svelte'
  import type { Slugger } from 'marked'
  import { contextKey } from '@magidoc/plugin-svelte-marked/markdown/markedConfiguration'
  import AnchorHeader from '$lib/components/common/text/AnchorHeader.svelte'

  export let token: marked.Tokens.Heading

  const { slug } = getContext<{ slug: Slugger }>(contextKey)

  let id: string
  $: id = slug.slug(token.text)
</script>

<AnchorHeader {id} depth={token.depth}>
  <slot />
</AnchorHeader>
