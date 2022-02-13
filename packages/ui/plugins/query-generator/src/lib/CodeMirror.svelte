<script lang="ts">
  import CodeMirror, { Editor } from 'codemirror'
  import 'codemirror/addon/edit/matchbrackets'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror-graphql/src/mode'
  import { afterUpdate, onMount } from 'svelte'

  export let code: string
  export let mode: 'graphql' | 'graphql-variables'
  export let height: number | 'auto'
  export let theme = 'default'
  export let showLineNumbers = true

  let root: HTMLElement
  let codeMirror: Editor

  onMount(() => {
    codeMirror = CodeMirror(
      (elt) => {
        root.innerHTML = ''
        root.appendChild(elt)
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

    codeMirror.setSize('auto', height)
  })

  afterUpdate(() => {
    if (codeMirror) {
      codeMirror.setOption('theme', theme)
      codeMirror.setOption('lineNumbers', showLineNumbers)
      codeMirror.setOption('mode', mode)
      codeMirror.setValue(code)
      codeMirror.setSize('auto', height)
      codeMirror.refresh()
    }
  })
</script>

<template>
  <div bind:this={root} />
</template>
