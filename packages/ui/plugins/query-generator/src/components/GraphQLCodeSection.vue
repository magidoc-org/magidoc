<template>
  <code-mirror
    :schema="schema"
    :code="code"
    :theme="theme"
    :mode="'graphql'"
    :show-line-numbers="showLineNumbers"
    :height="height"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CodeMirror from './CodeMirror.vue'
import { GraphQLSchema } from 'graphql'

export default defineComponent({
  components: { CodeMirror },
  props: {
    schema: {
      type: Object as PropType<GraphQLSchema>,
      required: true,
    },
    code: {
      type: String,
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
})
</script>
