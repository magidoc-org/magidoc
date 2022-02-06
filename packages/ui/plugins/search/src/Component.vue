<template lang="">
  <div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { GraphQLIntrospectionResult } from '@core/models/introspection'

export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<GraphQLIntrospectionResult>,
      required: true,
    }
  }
})
</script>

<style lang="">
  
</style>