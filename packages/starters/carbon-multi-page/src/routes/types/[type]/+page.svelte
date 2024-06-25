<script lang="ts">
import PreviousNextPage from '$lib/components/nav/PreviousNextPage.svelte'
import EnumType from '$lib/components/type/EnumType.svelte'
import InputObjectType from '$lib/components/type/InputObjectType.svelte'
import InterfaceType from '$lib/components/type/InterfaceType.svelte'
import ObjectType from '$lib/components/type/ObjectType.svelte'
import ScalarType from '$lib/components/type/ScalarType.svelte'
import UnionType from '$lib/components/type/UnionType.svelte'
import TypeUsages from '$lib/components/type/usage/TypeUsages.svelte'
import {
  type GraphQLNamedType,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isObjectType,
  isScalarType,
  isUnionType,
} from 'graphql'
import type { PageData } from './$types'

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
