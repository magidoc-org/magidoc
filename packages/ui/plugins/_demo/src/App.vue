<script setup lang="ts">
import PluginSeparator from './components/PluginSeparator.vue'
</script>

<template>
  <div>
    <docs-search :schema="schema" />
    <plugin-separator />
    <query-generator
      :schema="schema"
      :types-by-name="typesByName"
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
import schema from './assets/_schema.json'
import { introspectionResultToTypesByName } from '@core/models/typesByName'
import { GraphQLIntrospectionResult } from '@core/models/introspection'

export default defineComponent({
  data() {
    return {
      schema: schema as unknown as GraphQLIntrospectionResult,
    }
  },
  computed: {
    typesByName() {
      return introspectionResultToTypesByName(this.schema)
    },
    field() {
      if (this.schema.__schema.queryType?.name) {
        return (this.typesByName[this.schema.__schema.queryType?.name].fields ||
          [])[0]
      }
      return null
    },
  },
})
</script>

<style>
@import url(https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css);

code {
  font-family: 'Fira Code', monospace;
}

.CodeMirror {
  font-family: 'Fira Code';
  font-size: 1em;
  line-height: 1.2em;
}

.CodeMirror-gutter-wrapper {
  padding-left: 30px;
}

.qg-variables-separator {
  font-family: 'Fira Code';
}
</style>
