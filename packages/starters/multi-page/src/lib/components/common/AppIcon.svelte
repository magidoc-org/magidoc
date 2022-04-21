<script lang="ts">
  import { templates } from '@magidoc/plugin-starter-variables'

  const logoPath = templates.APP_LOGO.vite.getOrDefault(
    import.meta.env,
    'https://github.com/magidoc-org/magidoc/blob/main/logo/logo_horizontal.png?raw=true',
  )
</script>

<img src={logoPath} alt="Magidoc" {...$$props} />
