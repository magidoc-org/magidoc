<script lang="ts">
  import './beforeImport'
  import Prism from 'prismjs'
  import 'prismjs/plugins/line-numbers/prism-line-numbers'
  import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
  import 'prismjs/plugins/toolbar/prism-toolbar'
  import 'prismjs/plugins/toolbar/prism-toolbar.css'
  import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'

  /**
   * The target language to use. This language must be imported manually from prism to be activated.
   */
  export let language: string | undefined

  /**
   * The source code to highlight.
   */
  export let source: string

  /**
   * Either to show the line numbers or not.
   */
  export let showLineNumbers = false

  /**
   * Either to show the copy button or not.
   */
  export let showCopyButton = false

  /**
   * A minimum height the code container should have.
   * By default, code section will fit the content's height..
   */
  export let minHeight: string | undefined = undefined

  /**
   * A maximum height to restrict the code view into. In case of overflow, scrolling will be enabled.
   * By default, this is unrestricted.
   */
  export let maxHeight: string | undefined = undefined

  let root: HTMLElement

  function highlight(
    root: HTMLElement,
    language: string | undefined,
    source: string,
  ) {
    // The _ (language) parameter is important to force Svelte to reload if the language change

    // This is the way found to make PrismJS re-render on change
    // and also keep the toolbar working
    root.textContent = source

    // Clear class list and add the new language in it
    // Looks hacky, but since this component can be re-used,
    // it is important that the class is added before highlighting,
    // which is not always the case if done inside the html template.
    root.classList.forEach((item) => root.classList.remove(item))
    if (language) {
      root.classList.add(`language-${language}`)
      root.classList.add('prism--code')
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
  class:prism--show-copy-button={showCopyButton}
  class:prism--hide-copy-button={!showCopyButton}
>
  <pre
    class="prism--code-container"
    style="--min-height: {minHeight}; --max-height: {maxHeight};"
    class:line-numbers={showLineNumbers}>
    <code bind:this={root} />
  </pre>
</div>

<style>
  :global(.prism--code-container) {
    min-height: var(--min-height);
    max-height: var(--max-height);
    /* https://github.com/withastro/astro/issues/4246 */
    white-space: normal !important;
  }

  :global(.prism--code) {
    white-space: pre !important;
  }

  :global(.prism--show-copy-button .copy-to-clipboard-button) {
    display: block;
  }

  :global(.prism--hide-copy-button .copy-to-clipboard-button) {
    display: none;
  }
</style>
