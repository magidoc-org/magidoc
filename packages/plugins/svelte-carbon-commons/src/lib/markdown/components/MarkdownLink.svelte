<script lang="ts">
  import { joinUrlPaths } from '$lib/utils/url'

  import { Link } from 'carbon-components-svelte'
  import type { MarkdownOptions } from '../marked'
  export let href: string
  export let options: MarkdownOptions
</script>

<Link href={joinUrlPaths(options.baseUrl, href)}>
  <slot />
</Link>
