<script lang="ts">
  import { DEFAULT_LOGO } from '$lib/logo'
  import { getOrDefault, getSiteRoot } from '$lib/variables'

  import { templates } from '@magidoc/plugin-starter-variables'
  import { urlUtils } from '@magidoc/plugin-svelte-marked'

  let logoPath = getOrDefault(templates.APP_LOGO, DEFAULT_LOGO)
  logoPath = urlUtils.isRelative(logoPath)
    ? urlUtils.joinUrlPaths(getSiteRoot(), logoPath)
    : logoPath
</script>

<img src={logoPath} alt="Magidoc" {...$$props} />
