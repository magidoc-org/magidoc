<template>
  <div>
    <GraphQLCodeSection
      :code="`
      query {
        test(parameter: 123) {
          sublevel {
            again
          }
        }
      }
      `"
      :theme="theme"
      :show-line-numbers="showLineNumbers"
    />
  </div>
</template>

<script lang="ts">
import { TypesByName, Field } from "@core";
import { defineComponent, PropType } from "vue";
import GraphQLCodeSection from "./components/GraphQLCodeSection.vue";
import { GeneratorConfig } from "./domain/generator/config";

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
  }
});
</script>

