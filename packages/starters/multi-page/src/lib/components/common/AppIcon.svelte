<script lang="ts">
  import variables from '@magidoc/plugin-starter-variables'

  const logoPath =
    (import.meta.env[variables.common.APP_LOGO_PATH] as unknown as string) ??
    '/logo.png'
</script>

<img src={logoPath} alt="Magidoc" {...$$props} />
