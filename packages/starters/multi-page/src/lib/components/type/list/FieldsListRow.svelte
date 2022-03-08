<script lang="ts">
  import MarkdownDescription from '$lib/components/common/MarkdownDescription.svelte'
  import TypeLink from '$lib/components/common/TypeLink.svelte'

  import ArgsList from '$lib/components/query/list/ArgsList.svelte'

  import DeprecatedTag from '$lib/components/tags/DeprecatedTag.svelte'
  import NullableTag from '$lib/components/tags/NullableTag.svelte'
  import TypeLinkTag from '$lib/components/tags/TypeLinkTag.svelte'

  import {
    Button,
    StructuredListCell,
    StructuredListRow,
  } from 'carbon-components-svelte'
  import { ArrowDown16, ArrowUp16 } from 'carbon-icons-svelte'
  import type { GraphQLField } from 'graphql'

  export let item: GraphQLField<unknown, unknown, unknown>

  var showArguments = false
</script>

<StructuredListRow>
  <StructuredListCell>
    <p>
      <span style="font-weight: bold">{item.name}</span>
      <TypeLinkTag type={item.type} />
      <DeprecatedTag reason={item.deprecationReason} />
      <NullableTag type={item.type} />
    </p>
    {#if item.description}
      <MarkdownDescription description={item.description} />
    {/if}
    {#if item.args.length > 0}
      {#if showArguments}
        <div class="arguments-list-wrapper">
          <ArgsList data={item.args} />
        </div>
      {/if}
      <div class="button-wrapper">
        <Button
          kind="ghost"
          size="small"
          style="border-radius: 20px"
          icon={showArguments ? ArrowUp16 : ArrowDown16}
          on:click={() => (showArguments = !showArguments)}
        >
          {showArguments ? 'Hide Arguments' : 'Show Arguments'}
        </Button>
      </div>
    {/if}
  </StructuredListCell>
</StructuredListRow>

<style>
  .rounded {
    border-radius: 500px !important;
  }

  .arguments-list-wrapper {
    border-left: 3px solid lightgrey;
    padding-left: 10px;
    margin-top: 0.7rem;
    margin-bottom: 0.7rem;
  }

  .button-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 0.5rem;
  }
</style>
