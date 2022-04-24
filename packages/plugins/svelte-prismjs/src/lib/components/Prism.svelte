<script lang="ts">
  import './beforeImport'
  import Prism from 'prismjs'
  import 'prismjs/plugins/line-numbers/prism-line-numbers'
  import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
  import 'prismjs/plugins/toolbar/prism-toolbar'
  import 'prismjs/plugins/toolbar/prism-toolbar.css'
  import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'

  export let language: string | undefined
  export let source: string

  export let showLineNumbers = false
  export let showCopyButton = false

  let root: HTMLElement

  function highlight(root: HTMLElement, language: string, source: string) {
    // The _ (language) parameter is important to force Svelte to reload if the language change
    
    // This is the way found to make PrismJS re-render on change
    // and also keep the toolbar working
    root.textContent = source

    // Clear class list and add the new language in it
    // Looks hacky, but since this component can be re-used, 
    // it is important that the class is added before highlighting, 
    // which is not always the case if done inside the html template.
    root.classList.forEach((item) => root.classList.remove(item))
    if(language) {
      root.classList.add(`language-${language}`)
    } 

    Prism.highlightElement(root)
  }

  $: {
    if (root && Prism) {
      highlight(root, language, source)
    }
  }
</script>

<div
  class={`${
    showCopyButton ? 'prism--show-copy-button' : 'prism--hide-copy-button'
  }`}
>
  <pre class={`${showLineNumbers ? 'line-numbers' : ''}`}><code
      bind:this={root}
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
