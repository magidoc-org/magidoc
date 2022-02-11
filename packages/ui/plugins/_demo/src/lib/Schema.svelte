<script lang="ts">
  import schemaJson from '../assets/_schema.json'
  import { IntrospectionQuery, buildClientSchema } from 'graphql'
  import { readable } from 'svelte/store'

  export const schema = readable(
    buildClientSchema(schemaJson as unknown as IntrospectionQuery),
  )
</script>
