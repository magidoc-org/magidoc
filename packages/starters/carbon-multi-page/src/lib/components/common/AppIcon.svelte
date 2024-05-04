<script lang="ts">
  import { DEFAULT_LOGO } from '$lib/logo'
  import { getOrDefault, getSiteRoot } from '$lib/variables'

  import { templates } from '@magidoc/plugin-starter-variables'
  import {
    isRelative,
    joinUrlPaths,
  } from '../../../../../../plugins/svelte-marked/build/utils/url'

  let logoPath = getOrDefault(templates.APP_LOGO, DEFAULT_LOGO)
  logoPath = isRelative(logoPath)
    ? joinUrlPaths(getSiteRoot(), logoPath)
    : logoPath
</script>

<img src={logoPath} alt="Magidoc" {...$$props} />
