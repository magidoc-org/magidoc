<template>
  <QueryGenerator />
  <Search />
</template>

<script lang="ts">
import { Component as QueryGenerator } from "../../query-generator/src/index";
import { Component as Search } from "../../search/src/index";

export default {
  name: "A",
  components: {
    QueryGenerator,
    Search,
  },
};
</script>
