<script lang="ts">
  import variables from '@magidoc/plugin-starter-variables'

  const title =
    (import.meta.env[variables.common.APP_TITLE] as unknown as string) ??
    'Magidoc'
</script>

<span>{title}</span>
