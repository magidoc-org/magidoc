<template>
  <div ref="root" :style="{ height: 100 }" />
</template>

<script lang="ts">
import "codemirror/lib/codemirror.css";
import "./assets/monokai-sublime.css";
import CodeMirror from "codemirror/lib/codemirror.js";
import "codemirror-graphql/mode";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      root: ref(null),
    };
  },
  mounted() {
    CodeMirror(
      (elt) => {
        this.root.innerHTML = "";
        this.root.appendChild(elt);
      },
      {
        lineNumbers: true,
        value: `{
  test(variables: {input: "test"}) {
    query
  }
}`,
        theme: "monokai-sublime",
        mode: "graphql",
        disabled: true,
        readOnly: true,
        lineNumbers: true,
        indentUnit: 2,
        cursorBlinkRate: 0,
        cursorHeight: 0,
        smartIndent: true,
        dragDrop: false,
        spellcheck: false,
      }
    );
  },
});
</script>

<style>
@import url(https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css);

code {
  font-family: "Fira Code", monospace;
}

.CodeMirror {
  height: auto;
  font-family: "Fira Code";
  font-size: 1.4em;
  line-height: 1.5em;
}
</style>
