<script lang="ts">
  import { DEFAULT_LOGO } from '$lib/logo'

  import { templates } from '@magidoc/plugin-starter-variables'

  const logoPath = templates.APP_LOGO.vite.getOrDefault(
    import.meta.env,
    DEFAULT_LOGO,
  )
</script>

<img src={logoPath} alt="Magidoc" {...$$props} />
