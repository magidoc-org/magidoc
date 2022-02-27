<script lang="ts">
  import { schema } from '$lib/schema'
  import { page } from '$app/stores'
  import {
    GraphQLNamedType,
    isEnumType,
    isInterfaceType,
    isObjectType,
    isScalarType,
    isUnionType,
  } from 'graphql'
  import EntityNotFound from '$lib/components/EntityNotFound.svelte'
  import ScalarType from '$lib/components/type/ScalarType.svelte'
  import EnumType from '$lib/components/type/EnumType.svelte'
  import InterfaceType from '$lib/components/type/InterfaceType.svelte'
  import ObjectType from '$lib/components/type/ObjectType.svelte'
  import UnionType from '$lib/components/type/UnionType.svelte'

  let type: GraphQLNamedType | undefined
  $: type = $schema.getType($page.params.type)
</script>

{#if type}
  {#if isScalarType(type)}
    <ScalarType {type} />
  {:else if isEnumType(type)}
    <EnumType {type} />
  {:else if isEnumType(type)}
    <EnumType {type} />
  {:else if isInterfaceType(type)}
    <InterfaceType {type} />
  {:else if isUnionType(type)}
    <UnionType {type} />
  {:else if isObjectType(type)}
    <ObjectType {type} />
  {:else}
    <!-- else content here -->
  {/if}
{:else}
  <EntityNotFound type="type" name={$page.params.type} />
{/if}
