<template lang="">
  <div>HHI</div>
</template>

<script lang="ts">
import { Document } from 'flexsearch'
import { defineComponent, PropType } from 'vue'
import { GraphQLSchema, GraphQLObjectType, GraphQLDirective } from 'graphql'

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
    const query = this.schema.getQueryType()
    const mutation = this.schema.getMutationType()
    const subscription = this.schema.getSubscriptionType()

    if (query) {
      this.indexType(query)
    }

    if (mutation) {
      this.indexType(mutation)
    }

    if (subscription) {
      this.indexType(subscription)
    }

    this.schema
      .getDirectives()
      .forEach((directive) => this.indexDirective(directive))
  },
  methods: {
    indexType(type: GraphQLObjectType<any>) {

    },
    indexDirective(directive: GraphQLDirective) {

    }
  },
})
</script>

<style lang=""></style>
