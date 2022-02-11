<script lang="ts">
  import CodeMirror from 'codemirror'
  import { afterUpdate, onMount } from 'svelte'

  export let code: string
  export let mode: 'graphql' | 'graphql-variables'
  export let height: number | 'auto'
  export let theme: string = 'default'
  export let showLineNumbers: boolean = true

  let root: HTMLElement
  let codeMirror: CodeMirror

  onMount(() => {
    this.codeMirror = CodeMirror(
      (elt) => {
        this.root.innerHTML = ''
        this.root.appendChild(elt)
      },
      {
        lineNumbers: showLineNumbers,
        value: code,
        theme: theme,
        mode: mode,
        readOnly: 'nocursor',
        indentUnit: 4,
        matchBrackets: true,
        smartIndent: false,
        dragDrop: false,
        spellcheck: false,
      },
    )

    this.codeMirror.setSize('auto', height)
  })

  afterUpdate(() => {
    if (this.codeMirror) {
      this.codeMirror.setOption('theme', theme)
      this.codeMirror.setOption('lineNumbers', showLineNumbers)
      this.codeMirror.setOption('mode', mode)
      this.codeMirror.setValue(code)
      this.codeMirror.setSize('auto', height)
      this.codeMirror.refresh()
    }
  })
</script>

<template>
  <div bind:this={root} />
</template>
