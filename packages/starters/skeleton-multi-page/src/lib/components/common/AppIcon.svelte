<script lang="ts">
import lightLogo from '#lib/assets/logo-light.png'
import { appLogoURL, DEFAULT_LOGO } from '#lib/logo'
</script>

{#if appLogoURL === DEFAULT_LOGO}
  <img src={lightLogo} alt="Magidoc" class="dark:hidden" {...$$props} />
  <img src={appLogoURL} alt="Magidoc" class="hidden dark:block" {...$$props} />
{:else}
  <img src={appLogoURL} alt="Magidoc" {...$$props} />
{/if}
