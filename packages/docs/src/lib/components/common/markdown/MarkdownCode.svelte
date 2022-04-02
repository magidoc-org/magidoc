<script lang="ts">
  import './prism-theme.css'
  import Prism from '@magidoc/plugin-prismjs'
  import 'prism-svelte'
</script>

<Prism
  language={$$props.lang}
  source={$$props.text}
  showCopyButton
  showLineNumbers
/>
