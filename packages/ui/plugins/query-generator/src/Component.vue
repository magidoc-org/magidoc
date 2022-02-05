<template>
  <div ref="root" :style="{ height: 100 }" />
</template>

<script lang="ts">

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

