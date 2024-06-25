<script lang="ts">
import AnchorHeader from '$lib/components/common/text/AnchorHeader.svelte'
import { type MarkdownOptions, urlUtils } from '@magidoc/plugin-svelte-marked'
import type { Tokens } from 'marked'

export let token: Tokens.Heading
export let options: MarkdownOptions

let id: string
$: id = urlUtils.generatePathSegment(token.text, options.slugger)
</script>

<AnchorHeader {id} depth={token.depth}>
  <slot />
</AnchorHeader>
