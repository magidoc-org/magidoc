<script lang="ts">
  import type { TokensList } from 'marked'

  import MarkdownTokens from './MarkdownTokens.svelte'
  import {
    defaultOptions,
    defaultRenderers,
    parse,
    type MarkdownOptions,
    type Renderers,
  } from './markedConfiguration'
  import { suppressWarnings } from './suppressWarnings'

  suppressWarnings()

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

  let tokens: TokensList
  let actualRenderers: Renderers
  let actualOptions: MarkdownOptions

  $: {
    // Only a single reactive block is needed here, so that changing the source
    // Will also re-create the options and renderers, so that a new Slugger is created
    tokens = parse(source)
    actualRenderers = { ...defaultRenderers(), ...renderers }
    actualOptions = { ...defaultOptions(), ...options }
  }
</script>

<MarkdownTokens {tokens} renderers={actualRenderers} options={actualOptions} />
