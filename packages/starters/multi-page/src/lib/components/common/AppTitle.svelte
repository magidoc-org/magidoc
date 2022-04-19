<script lang="ts">
  import { common } from '@magidoc/plugin-starter-variables'

  const title = common.APP_TITLE.vite.getOrDefault(import.meta.env, 'Magidoc')
</script>

<span>{title}</span>
