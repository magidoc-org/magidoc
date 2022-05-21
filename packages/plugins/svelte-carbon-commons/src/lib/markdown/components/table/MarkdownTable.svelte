<script lang="ts">
  import MarkdownTokens from '$lib/markdown/MarkdownTokens.svelte'
  import type { MarkdownOptions, Renderers } from '$lib/markdown/marked'
  import {
    StructuredList,
    StructuredListBody,
    StructuredListCell,
    StructuredListHead,
    StructuredListRow,
  } from 'carbon-components-svelte'
  import type { marked } from 'marked'

  export let token: marked.Tokens.Table
  export let options: MarkdownOptions
  export let renderers: Renderers
</script>

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

<!-- Hack to stop warnings from printing -->
{#if false}
  <slot />
{/if}
