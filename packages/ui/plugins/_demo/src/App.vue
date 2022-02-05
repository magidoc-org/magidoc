<script setup lang="ts">
import Separator from "./components/Separator.vue";
</script>

<template>
  <separator />
  <query-generator :schema="schema" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import schema from "./assets/_schema.json";

export default defineComponent({
  data() {
    return {
      schema,
    };
  },
});
</script>

