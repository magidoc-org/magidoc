<template>
  <div>
    <GraphQLCodeSection
      :code="code"
      :theme="theme"
      :show-line-numbers="showLineNumbers"
    />
  </div>
</template>

<script lang="ts">
import { Field } from "@core/models/introspection";
import { GeneratorConfig } from "@core/generator/config";
import { generateGraphQLQuery } from "@core/generator/queryGenerator";
import { TypesByName } from "@core/models/typesByName";
import { defineComponent, PropType } from "vue";
import GraphQLCodeSection from "./components/GraphQLCodeSection.vue";

export default defineComponent({
  components: { GraphQLCodeSection },
  props: {
    typesByName: {
      type: Object as PropType<TypesByName>,
      required: true,
    },
    field: {
      type: Object as PropType<Field>,
      required: true,
    },
    generatorConfig: {
      type: Object as PropType<Partial<GeneratorConfig>>,
      required: false,
    },
    theme: {
      type: String,
      default: 'default',
    },
    showLineNumbers: {
      type: Boolean,
      default: true,
    },
    depth: {
      type: Number,
      default: 3,
    }
  },
  data() {
    console.log('AAA')
    console.log(this.typesByName)
    console.log(this.field)
    console.log(this.generatorConfig)
    console.log(generateGraphQLQuery)
    return {
      code: 'test'
    }
  },
});
</script>

