<script lang="ts">
  import { joinUrlPaths } from '$lib/utils/url'
  import { Link } from 'carbon-components-svelte'
  import type { marked } from 'marked'
  import type { MarkdownOptions, Renderers } from '../marked'

  export let token: marked.Tokens.Link
  export let options: MarkdownOptions
  export const renderers: Renderers = undefined
</script>

<Link href={joinUrlPaths(options.baseUrl, token.href)}>
  <slot />
</Link>
