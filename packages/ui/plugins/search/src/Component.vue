<template lang="">
  <div>HHI</div>
</template>

<script lang="ts">
import { Document } from 'flexsearch'
import { defineComponent, PropType } from 'vue'
import { GraphQLSchema } from 'graphql'

export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<GraphQLSchema>,
      required: true,
    },
  },
  data() {
    return {
      index: new Document({
        tokenize: 'full',
        document: {
          id: 'main',
          field: ['label', 'munchkin'],
        },
      }),
    }
  },
  mounted() {
    this.index.add({
      id: 'test',
      label: 'potato',
    })
    this.index.add({
      id: 'test-2',
      munchkin: 'wtf pot',
    })
    this.index.add({
      id: 'test-3',
      munchkin: 'unrelated',
    })
    console.log(this.index.search('po'))
  },
})
</script>

<style lang=""></style>
