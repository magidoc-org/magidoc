<script lang="ts" context="module">
  export function load({ stuff, params, url }: LoadInput): LoadOutput {
    const type: GraphQLNamedType | undefined = stuff.schema?.getType(
      params.type,
    )

    const page = findPageByHref(url.pathname)

    if (!type || !page) {
      return {
        status: 404,
        error: `Type ${params.type} not found`,
      }
    }

    return {
      props: {
        type,
        page,
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
  import { findPageByHref } from '$lib/pages'
  import PreviousNextPage from '$lib/components/common/PreviousNextPage.svelte'
  import type { WebsitePage } from 'src/app'

  export let type: GraphQLNamedType
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

<PreviousNextPage {page} />
