<script lang="ts">
import { type MarkdownOptions, urlUtils } from '@magidoc/plugin-svelte-marked'
import type { Tokens } from 'marked'
import AnchorHeader from '$lib/components/common/text/AnchorHeader.svelte'

export let token: Tokens.Heading
export let options: MarkdownOptions

let id: string
$: id = urlUtils.generatePathSegment(token.text, options.slugger)
</script>

<AnchorHeader {id} depth={token.depth}>
  <slot />
</AnchorHeader>
