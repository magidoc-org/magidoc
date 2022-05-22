<script lang="ts">
  import { joinUrlPaths } from '../../utils/url'
  import { Link } from 'carbon-components-svelte'
  import type { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../markedConfiguration'

  export let token: marked.Tokens.Link
  export let options: MarkdownOptions
  export const renderers: Renderers = undefined

  function isRelative(url: string): boolean {
    return url.startsWith('/') || url.startsWith('#')
  }
</script>

<Link
  href={isRelative(token.href)
    ? joinUrlPaths(options.baseUrl, token.href)
    : token.href}
>
  <slot />
</Link>
