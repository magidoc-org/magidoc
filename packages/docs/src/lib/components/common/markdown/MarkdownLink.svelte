<script lang="ts">
  import { Link } from 'carbon-components-svelte'
  import { base } from '$app/paths'
  export let href: string

  let relativeHref: string
  $: relativeHref = href.startsWith('/') ? `${base}${href}` : href
</script>

<Link href={relativeHref}>
  <slot />
</Link>
