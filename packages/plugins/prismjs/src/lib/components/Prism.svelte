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

  $: {
    if (root && Prism) {
      // This is the way found to make PrismJS re-render on change 
      // and also keep the toolbar working
      root.textContent = source
      Prism.highlightElement(root)
    }
  }
</script>

<div
  class={`${
    showCopyButton ? 'prism--show-copy-button' : 'prism--hide-copy-button'
  }`}
>
  <pre
    class={`${
      showLineNumbers ? 'line-numbers' : ''
    } language-${language}`}><code
      bind:this={root}
      class="language-{language}"
    /></pre>
</div>

<style global>
  .prism--show-copy-button .copy-to-clipboard-button {
    display: block;
  }

  .prism--hide-copy-button .copy-to-clipboard-button {
    display: none;
  }
</style>
