<script lang="ts">
import type { MarkdownOptions } from '@magidoc/plugin-svelte-marked'
import { urlUtils } from '@magidoc/plugin-svelte-marked'
import type { Tokens } from 'marked'

export let token: Tokens.Link
export let options: MarkdownOptions
</script>

<a
  class="font-medium underline decoration-primary-500/40 underline-offset-4 transition-colors hover:text-primary-700-300 hover:decoration-primary-500"
  href={urlUtils.isRelative(token.href) ? urlUtils.joinUrlPaths(options.baseUrl, token.href) : token.href}
  title={token.title}
>
  <slot />
</a>
