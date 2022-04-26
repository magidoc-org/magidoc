<script lang="ts">
  import { Link } from 'carbon-components-svelte'
  import { baseVar } from './stores'
  export let href: string
</script>

<Link
  href={href.startsWith('/') && $baseVar !== '/' ? `${$baseVar}${href}` : href}
>
  <slot />
</Link>
