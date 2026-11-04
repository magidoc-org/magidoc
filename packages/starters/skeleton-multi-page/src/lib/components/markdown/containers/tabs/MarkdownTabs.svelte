<script lang="ts">
import { type MarkdownOptions, MarkdownTokens, type Renderers } from '@magidoc/plugin-svelte-marked'
import { Tabs } from '@skeletonlabs/skeleton-svelte'
import type { TabsToken } from './Tabs'

export let token: TabsToken
export let options: MarkdownOptions
export let renderers: Renderers
</script>

<Tabs defaultValue="0" class="my-4">
  <Tabs.List>
    {#each token.tabs as tab, index}
      <Tabs.Trigger value={String(index)}>{tab.title}</Tabs.Trigger>
    {/each}
    <Tabs.Indicator />
  </Tabs.List>
  {#each token.tabs as tab, index}
    <Tabs.Content value={String(index)}>
      <MarkdownTokens {options} {renderers} tokens={tab.tokens} />
    </Tabs.Content>
  {/each}
</Tabs>
