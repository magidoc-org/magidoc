<template>
  <div ref="root" />
</template>

<script lang="ts">
import 'codemirror/lib/codemirror.css'
import CodeMirror, { Editor } from 'codemirror'
import 'codemirror-graphql/mode'
import 'codemirror/mode/javascript/javascript'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  props: {
    code: {
      type: String,
      required: true,
    },
    mode: {
      type: String as PropType<'javascript' | 'graphql'>,
      required: true,
    },
    height: {
      type: Object as PropType<'auto' | number>,
      default: 'auto',
    },
    theme: String,
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
        readOnly: true,
        indentUnit: 2,
        cursorBlinkRate: 0,
        cursorHeight: 0,
        smartIndent: true,
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
