<script lang="ts">
import type { MarkdownOptions } from '@magidoc/plugin-svelte-marked'
import { urlUtils } from '@magidoc/plugin-svelte-marked'

import { Link } from 'carbon-components-svelte'
import type { Tokens } from 'marked'

export let token: Tokens.Link
export let options: MarkdownOptions
</script>

<Link
  href={urlUtils.isRelative(token.href)
    ? urlUtils.joinUrlPaths(options.baseUrl, token.href)
    : token.href}
  title={token.title}
>
  <slot />
</Link>
