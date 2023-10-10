<script lang="ts">
  import MarkdownTokens from '../../MarkdownTokens.svelte'
  import type { MarkdownOptions, Renderers } from '../../markedConfiguration'
  import type { Tokens } from 'marked'

  export let token: Tokens.Table
  export let options: MarkdownOptions
  export let renderers: Renderers
</script>

<table>
  <thead>
    <tr>
      {#each token.header as item}
        <th scope="col">
          <MarkdownTokens tokens={item.tokens} {options} {renderers} />
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each token.rows as row}
      <tr>
        {#each row as col}
          <td>
            <MarkdownTokens tokens={col.tokens} {options} {renderers} />
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
