<script lang="ts">
  import './prism-theme.css'
  import Prism from '@magidoc/plugin-prismjs'
  import 'prism-svelte'
  import 'prismjs/components/prism-graphql'
  import 'prismjs/components/prism-json'
  import 'prismjs/components/prism-typescript'
  import 'prismjs/components/prism-bash'
</script>

<Prism
  language={$$props.lang}
  source={$$props.text}
  showCopyButton
  showLineNumbers
/>
