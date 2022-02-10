<template>
  <div>
    <el-autocomplete placeholder="Test" :model-value="value" />
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Document } from 'flexsearch'
import { defineComponent, PropType, ref } from 'vue'
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLDirective,
  GraphQLNamedType,
} from 'graphql'
import { ElAutocomplete } from 'element-plus'

export default defineComponent({
  components: { ElAutocomplete },
  setup() {
    return {
      value: ref(''),
    }
  },
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
          field: ['name', 'munchkin'],
        },
      }),
    }
  },
  mounted() {
    const query = this.schema.getQueryType()
    const mutation = this.schema.getMutationType()
    const subscription = this.schema.getSubscriptionType()

    if (query) {
      this.indexRootType(query)
    }

    if (mutation) {
      this.indexRootType(mutation)
    }

    if (subscription) {
      this.indexRootType(subscription)
    }

    _.forEach(this.schema.getTypeMap(), (type: GraphQLNamedType) => {
      this.indexType(type)
    })

    this.schema
      .getDirectives()
      .forEach((directive) => this.indexDirective(directive))
  },
  methods: {
    indexRootType(type: GraphQLObjectType<any>) {
      // _.forEach(type.getFields(), (field: GraphQLField<any, any>) => {
      //   this.index.add({
      //     name: field.name,
      //     description: field.description,
      //     source: field.
      //   })
      // })
    },
    indexType(type: GraphQLNamedType) {
      // this.index.add({
      //   type: 'TYPE',
      //   name: type.name,
      //   description: type.description,
      // })
    },
    indexDirective(directive: GraphQLDirective) {
      // this.index.add({
      //   type: 'DIRECTIVE',
      //   name: directive.name,
      //   description: directive.description,
      // })
    },
  },
})
</script>

<style lang=""></style>
