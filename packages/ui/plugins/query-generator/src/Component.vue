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
import { GraphQLIntrospectionResult } from "../../../../core/models/introspection";
import { defineComponent, PropType } from "vue";
import GraphQLCodeSection from "./components/GraphQLCodeSection.vue";
import { GeneratorConfig } from "./domain/generator/config";

export default defineComponent({
  components: { GraphQLCodeSection },
  props: {
    schema: {
      type: Object as PropType<GraphQLIntrospectionResult>,
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

