<script lang="ts">
import { type MarkdownOptions, MarkdownTokens, type Renderers } from '@magidoc/plugin-svelte-marked'
import type { Tokens } from 'marked'

export let token: Tokens.Table
export let options: MarkdownOptions
export let renderers: Renderers
</script>

<div class="table-wrap my-4">
  <table class="table">
    <thead>
      <tr>
        {#each token.header as item}
          <th><MarkdownTokens tokens={item.tokens} {options} {renderers} /></th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each token.rows as row}
        <tr>
          {#each row as col}
            <td><MarkdownTokens tokens={col.tokens} {options} {renderers} /></td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
