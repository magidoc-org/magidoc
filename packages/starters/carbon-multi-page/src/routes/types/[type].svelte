<script lang="ts" context="module">
  export function load({ stuff, params }: LoadInput): LoadOutput {
    const type: GraphQLNamedType | undefined = stuff.schema?.getType(
      params.type,
    )
    if (!type) {
      return {
        status: 404,
        error: `Type ${params.type} not found`,
      }
    }

    return {
      props: {
        type,
      },
    }
  }
</script>

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
  import type { LoadInput } from '@sveltejs/kit/types/internal'
  import type { LoadOutput } from '@sveltejs/kit/types/internal'

  export let type: GraphQLNamedType
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
