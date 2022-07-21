<script lang="ts">
  import AppExpandButton from '$lib/components/common/AppExpandButton.svelte'
  import AppMarkdown from '$lib/components/common/AppMarkdown.svelte'

  import ArgsList from '$lib/components/query/list/ArgsList.svelte'

  import DeprecatedTag from '$lib/components/tags/DeprecatedTag.svelte'
  import NullableTag from '$lib/components/tags/NullableTag.svelte'
  import TypeLinkTag from '$lib/components/tags/TypeLinkTag.svelte'

  import {
    StructuredListCell,
    StructuredListRow,
  } from 'carbon-components-svelte'
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

    <AppMarkdown source={item.description} />

    {#if item.args.length > 0}
      {#if showArguments}
        <div class="arguments-list-wrapper">
          <ArgsList data={item.args} />
        </div>
      {/if}
      <AppExpandButton
        totalItems={item.args.length}
        collapsedText="Show arguments"
        expandedText="Hide arguments"
        bind:expanded={showArguments}
      />
    {/if}
  </StructuredListCell>
</StructuredListRow>

<style>
  .arguments-list-wrapper {
    border-left: 3px solid var(--cds-ui-03, #dcdbdb);
    padding-left: 10px;
    margin-top: 0.7rem;
    margin-bottom: 0.7rem;
  }
</style>
