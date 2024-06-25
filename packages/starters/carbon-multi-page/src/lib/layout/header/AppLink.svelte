<script lang="ts">
import type { ExternalLink } from '@magidoc/plugin-starter-variables'
import { HeaderPanelLink } from 'carbon-components-svelte'
import { computeIcon } from './links'

export let link: ExternalLink
</script>

<HeaderPanelLink href={link.href}>
  <div class="container">
    <svelte:component
      this={computeIcon(link)}
      size={16}
      style="margin-right: 0.3rem"
    />
    {link.label}
  </div>
</HeaderPanelLink>

<style>
  .container {
    display: flex;
    align-items: center;
    height: 100%;
  }
</style>
