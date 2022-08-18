<script lang="ts">
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

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
  import type { LoadEvent, LoadOutput } from '@sveltejs/kit'
  import { findPageByHref } from '$lib/pages'
  import PreviousNextPage from '$lib/components/nav/PreviousNextPage.svelte'
  import type { WebsitePage } from 'src/app'
  import { getTypeByName, getTypeUsages } from '$lib/model'
  import type { TypeReverseMapping } from '@magidoc/plugin-reverse-schema-mapper'
  import TypeUsages from '$lib/components/type/usage/TypeUsages.svelte'

  export let type: GraphQLNamedType
  export let usages: TypeReverseMapping | undefined
  export let page: WebsitePage
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

{#if usages}
  <TypeUsages {usages} />
{/if}

<PreviousNextPage {page} />
