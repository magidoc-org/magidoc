<template lang="">
  <div>
    HHI
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { GraphQLSchema } from 'graphql'

export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<GraphQLSchema>,
      required: true,
    },
  },
})
</script>

<style lang=""></style>
