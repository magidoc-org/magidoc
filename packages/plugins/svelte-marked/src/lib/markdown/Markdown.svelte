<script lang="ts">
  import { Slugger } from 'marked'

  import { setContext } from 'svelte'
  import MarkdownTokens from './MarkdownTokens.svelte'
  import {
    contextKey,
    defaultOptions,
    defaultRenderers,
    parse,
    type MarkdownOptions,
    type Renderers,
  } from './markedConfiguration'
  import { suppressWarnings } from './suppressWarnings'

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

  setContext(contextKey, {
    slug: new Slugger(),
  })

  $: tokens = parse(source)

  $: actualRenderers = { ...defaultRenderers, ...renderers }
  $: actualOptions = { ...defaultOptions, ...options }

  suppressWarnings()
</script>

<MarkdownTokens {tokens} renderers={actualRenderers} options={actualOptions} />
