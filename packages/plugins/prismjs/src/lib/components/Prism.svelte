<script lang="ts">
  import './beforeImport'
  import Prism from 'prismjs'  
  import 'prismjs/plugins/line-numbers/prism-line-numbers'
  import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
  import 'prismjs/plugins/toolbar/prism-toolbar'
  import 'prismjs/plugins/toolbar/prism-toolbar.css'
  import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'

  export let language: string
  export let source: string

  export let showLineNumbers = false
  export let showCopyButton = false

  let root: HTMLElement

  $: root && Prism && Prism.highlightAllUnder(root)
</script>

<div
  bind:this={root}
  class={`${showCopyButton ? 'show-copy-button' : 'hide-copy-button'}`}
>
  <pre class={`${showLineNumbers ? 'line-numbers' : ''}`}><code
      class={`language-${language}`}>{source}</code
    ></pre>
</div>

<style global>
  .show-copy-button .copy-to-clipboard-button {
    display: block;
  }

  .hide-copy-button .copy-to-clipboard-button {
    display: none;
  }
</style>
