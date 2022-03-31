<script lang="ts">
  import './prism-theme.css'
  import Prism from '@magidoc/plugin-prismjs'
</script>

<Prism language={$$props.lang} source={$$props.text} />
