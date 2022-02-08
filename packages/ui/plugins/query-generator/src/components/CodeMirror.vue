<template>
  <div ref="root" />
</template>

<script lang="ts">
import 'codemirror/lib/codemirror.css'

import CodeMirror, { Editor } from 'codemirror'
import 'codemirror-graphql/mode'
import 'codemirror-graphql/variables/mode'
import 'codemirror/addon/edit/matchbrackets'

import { defineComponent, PropType, ref } from 'vue'
import { GraphQLSchema } from 'graphql'

export default defineComponent({
  props: {
    schema: {
      type: [Object, null] as PropType<GraphQLSchema | undefined>,
      required: false,
      default: undefined,
    },
    code: {
      type: String,
      required: true,
    },
    mode: {
      type: String as PropType<'graphql' | 'graphql-variables'>,
      required: true,
    },
    height: {
      type: [String, Number] as PropType<'auto' | number>,
      default: 'auto',
    },
    theme: {
      type: String,
      default: 'default',
    },
    showLineNumbers: Boolean,
  },
  setup() {
    return {
      root: ref<HTMLElement | null>(null),
    }
  },
  data() {
    return {
      codeMirror: null as Editor | null,
    }
  },
  mounted() {
    this.codeMirror = CodeMirror(
      (elt) => {
        if (this.root) {
          this.root.innerHTML = ''
          this.root.appendChild(elt)
        }
      },
      {
        lineNumbers: this.$props.showLineNumbers,
        value: this.$props.code,
        theme: this.$props.theme,
        mode: this.$props.mode,
        readOnly: 'nocursor',
        indentUnit: 4,
        matchBrackets: true,
        smartIndent: false,
        dragDrop: false,
        spellcheck: false,
      },
    )

    this.codeMirror.setSize('auto', this.$props.height)
  },
  updated() {
    if (this.codeMirror) {
      this.codeMirror.setOption('theme', this.$props.theme)
      this.codeMirror.setOption('lineNumbers', this.$props.showLineNumbers)
      this.codeMirror.setOption('mode', this.$props.mode)
      this.codeMirror.setValue(this.$props.code)
      this.codeMirror.setSize('auto', this.$props.height)
      this.codeMirror.refresh()
    }
  },
})
</script>
