<script lang="ts">
  import './prism-theme.css'
  import Prism from '@magidoc/plugin-svelte-prismjs'
  import 'prismjs/components/prism-graphql'
  import 'prismjs/components/prism-json'
  import 'prismjs/components/prism-typescript'
  import 'prismjs/components/prism-bash'
  import 'prism-svelte'
</script>

<Prism
  language={$$props.lang}
  source={$$props.text}
  showCopyButton
  showLineNumbers
/>
