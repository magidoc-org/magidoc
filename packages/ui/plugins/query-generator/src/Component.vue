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
import 'codemirror/theme/darcula.css'
import { defineComponent } from "vue";
import GraphQLCodeSection from "./components/GraphQLCodeSection.vue";

export default defineComponent({
  components: { GraphQLCodeSection },
  props: {
    theme: {
      type: String,
      default: 'darcula',
    },
    showLineNumbers: {
      type: Boolean,
      default: true,
    }
  }
});
</script>

