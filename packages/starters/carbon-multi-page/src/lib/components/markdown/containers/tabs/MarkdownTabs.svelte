<script lang="ts">
import { type MarkdownOptions, MarkdownTokens, type Renderers } from '@magidoc/plugin-svelte-marked'

import { Tab, TabContent, Tabs } from 'carbon-components-svelte'
import type { TabsToken } from './Tabs'

export let token: TabsToken
export let options: MarkdownOptions
export let renderers: Renderers
</script>

<Tabs autoWidth>
  {#each token.tabs as tab}
    <Tab label={tab.title} />
  {/each}

  <svelte:fragment slot="content">
    {#each token.tabs as tab}
      <TabContent>
        <MarkdownTokens {options} {renderers} tokens={tab.tokens} />
      </TabContent>
    {/each}
  </svelte:fragment>
</Tabs>
