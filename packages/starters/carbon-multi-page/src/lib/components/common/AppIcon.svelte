<script lang="ts">
  import { DEFAULT_LOGO } from '$lib/logo'
  import { getOrDefault } from '$lib/variables'

  import { templates } from '@magidoc/plugin-starter-variables'

  const logoPath = getOrDefault(templates.APP_LOGO, DEFAULT_LOGO)
</script>

<img src={logoPath} alt="Magidoc" {...$$props} />
