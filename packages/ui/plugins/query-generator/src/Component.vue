<template>
  <div ref="root" />
</template>

<script lang="ts">
import "codemirror/lib/codemirror.css"
import CodeMirror from "codemirror";
import { defineComponent, ref } from "vue";

export default defineComponent({
  // props: {
  //   schema: GraphQLIntrospectionResult,
  // },
  setup() {
    return {
      root: ref(null),
    };
  },
  mounted() {
    CodeMirror(
      (elt) => {
        this.root.parentNode.replaceChild(elt, this.root);
      },
      {
        lineNumbers: true,
        value: "function myScript(){return 150;}\n",
        mode: "javascript",
        disabled: true,
      }
    );
  },
});
</script>
