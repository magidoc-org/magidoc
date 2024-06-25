<script lang="ts">
import { Tag } from 'carbon-components-svelte'
import { type GraphQLType, isNullableType } from 'graphql'

export let type: GraphQLType
</script>

{#if !isNullableType(type)}
  <Tag type="purple">Non-null</Tag>
{/if}
