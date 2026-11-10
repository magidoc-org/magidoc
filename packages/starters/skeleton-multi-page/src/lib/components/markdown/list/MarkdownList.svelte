<script lang="ts">
import { type MarkdownOptions, MarkdownToken, type Renderers } from '@magidoc/plugin-svelte-marked'
import type { Tokens } from 'marked'
import AppList from '#lib/components/common/list/AppList.svelte'

export let token: Tokens.List
export let options: MarkdownOptions
export let renderers: Renderers
</script>

<AppList ordered={token.ordered} start={token.start || 1}>
  {#each token.items as item}
    <MarkdownToken token={{ ...item }} {options} {renderers} />
  {/each}
</AppList>
