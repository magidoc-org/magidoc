<script lang="ts">
  import MarkdownTokens from './MarkdownTokens.svelte'
  import {
    defaultOptions,
    defaultRenderers,
    parse,
    type MarkdownOptions,
    type Renderers,
  } from './marked'

  /**
   * The markdown source
   */
  export let source: string

  /**
   * Options passed to markdown renderers
   */
  export let options: Partial<MarkdownOptions> = {}

  /**
   * Optional renderers that can overwrite the default ones.
   */
  export let renderers: Partial<Renderers> = {}

  $: tokens = parse(source)

  $: actualRenderers = { ...defaultRenderers, ...renderers }
  $: actualOptions = { ...defaultOptions, ...options }
</script>

<MarkdownTokens {tokens} renderers={actualRenderers} options={actualOptions} />
