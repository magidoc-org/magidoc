<script setup lang="ts">
import Separator from "./components/Separator.vue";
</script>

<template>
  <div>
    <separator />
    <query-generator :typesByName="typesByName" :field="field" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import schema from "./assets/_schema.json";
import { introspectionResultToTypesByName } from "@core/models/typesByName";
import { GraphQLIntrospectionResult } from "@core/models/introspection";

export default defineComponent({
  data() {
    return {
      schema: schema as unknown as GraphQLIntrospectionResult,
    };
  },
  computed: {
    typesByName() {
      return introspectionResultToTypesByName(this.schema)
    },
    field() {
      if (this.schema.__schema.queryType?.name) {
        return (this.typesByName[this.schema.__schema.queryType?.name].fields || [])[0]
      }
      return null
    }
  }
});
</script>

