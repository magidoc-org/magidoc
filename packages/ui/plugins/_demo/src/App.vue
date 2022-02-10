<script setup lang="ts">
import PluginSeparator from './components/PluginSeparator.vue'
</script>

<template>
  <div>
    <el-input />
    <plugin-separator />
    <query-generator
      :schema="schema"
      :field="field"
      :query-panel-height="300"
      :variables-panel-height="'auto'"
      :generator-config="{
        maxDepth: 5,
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import schemaJson from './assets/_schema.json'
import { IntrospectionQuery, buildClientSchema } from 'graphql'

export default defineComponent({
  data() {
    return {
      schema: buildClientSchema(schemaJson as unknown as IntrospectionQuery),
    }
  },
  computed: {
    field() {
      const queryType = this.schema.getQueryType()

      if (queryType) {
        const fields = queryType.getFields()
        return fields[Object.keys(fields)[0]]
      }

      return null
    },
  },
})
</script>

<style>
@import url(https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css);

code {
  font-family: "Fira Code", monospace;
}

.CodeMirror {
  font-family: "Fira Code";
  font-size: 1em;
  line-height: 1.2em;
}

.CodeMirror-gutter-wrapper {
  padding-left: 30px;
}

.qg-variables-separator {
  font-family: "Fira Code";
}
</style>
