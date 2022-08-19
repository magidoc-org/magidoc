<script lang="ts">
  import {
    isEnumType,
    isInputObjectType,
    isInterfaceType,
    isObjectType,
    isScalarType,
    isUnionType,
    type GraphQLNamedType,
  } from 'graphql'
  import ScalarType from '$lib/components/type/ScalarType.svelte'
  import EnumType from '$lib/components/type/EnumType.svelte'
  import InterfaceType from '$lib/components/type/InterfaceType.svelte'
  import ObjectType from '$lib/components/type/ObjectType.svelte'
  import UnionType from '$lib/components/type/UnionType.svelte'
  import InputObjectType from '$lib/components/type/InputObjectType.svelte'
  import TypeUsages from '$lib/components/type/usage/TypeUsages.svelte'
  import type { PageData } from './$types'
  import PreviousNextPage from '$lib/components/nav/PreviousNextPage.svelte'

  export let data: PageData

  let type: GraphQLNamedType
  $: type = data.type
</script>

<svelte:head>
  <title>Type - {type.name}</title>
</svelte:head>

{#if isScalarType(type)}
  <ScalarType {type} />
{:else if isEnumType(type)}
  <EnumType {type} />
{:else if isInterfaceType(type)}
  <InterfaceType {type} />
{:else if isUnionType(type)}
  <UnionType {type} />
{:else if isObjectType(type)}
  <ObjectType {type} />
{:else if isInputObjectType(type)}
  <InputObjectType {type} />
{/if}

{#if data.usages}
  <TypeUsages usages={data.usages} />
{/if}

<PreviousNextPage page={data.page} />
