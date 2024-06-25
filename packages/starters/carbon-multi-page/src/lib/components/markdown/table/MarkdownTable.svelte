<script lang="ts">
import { type MarkdownOptions, MarkdownTokens, type Renderers } from '@magidoc/plugin-svelte-marked'

import {
  StructuredList,
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListRow,
} from 'carbon-components-svelte'
import type { Tokens } from 'marked'

export let token: Tokens.Table
export let options: MarkdownOptions
export let renderers: Renderers
</script>

<div class="markdown-table-wrapper">
  <StructuredList>
    <StructuredListHead>
      <StructuredListRow head>
        {#each token.header as item}
          <StructuredListCell head>
            <MarkdownTokens tokens={item.tokens} {options} {renderers} />
          </StructuredListCell>
        {/each}
      </StructuredListRow>
    </StructuredListHead>

    <StructuredListBody>
      {#each token.rows as row}
        <StructuredListRow>
          {#each row as col}
            <StructuredListCell>
              <MarkdownTokens tokens={col.tokens} {options} {renderers} />
            </StructuredListCell>
          {/each}
        </StructuredListRow>
      {/each}
    </StructuredListBody>
  </StructuredList>
</div>

<style>
  .markdown-table-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
  }

  .markdown-table-wrapper :global(.bx--structured-list) {
    margin-bottom: 0 !important;
  }
</style>
