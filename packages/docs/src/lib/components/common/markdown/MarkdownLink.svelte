<script lang="ts">
  import { Link } from 'carbon-components-svelte'

  export let href: string
</script>

<Link {href}>
  <slot />
</Link>
