<script lang="ts">
  import './prism-theme.css'
  import Prism from '@magidoc/plugin-svelte-prismjs'

  export let lang: string
  export let text: string

  export let showCopyButton = true
  export let showLineNumbers = true
</script>

<Prism language={lang} source={text} {showCopyButton} {showLineNumbers} />
