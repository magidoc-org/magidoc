<script lang="ts">
import { getAllowedArgumentsByDirective } from '$lib/model'
import type { GraphQLArgument, GraphQLDirective } from 'graphql'
import AnchorHeader from '../common/text/AnchorHeader.svelte'
import CarbonMarkdown from '../markdown/CarbonMarkdown.svelte'
import ArgsList from '../query/list/ArgsList.svelte'

export let directive: GraphQLDirective

let allowedArgs: ReadonlyArray<GraphQLArgument>
$: allowedArgs = getAllowedArgumentsByDirective(directive)
</script>

<section>
  <AnchorHeader id={'title'} depth={1}>
    {directive.name}
  </AnchorHeader>

  <CarbonMarkdown source={directive.description} />

  {#if allowedArgs.length > 0}
    <AnchorHeader id={'arguments'} depth={2}>Arguments</AnchorHeader>
    <ArgsList data={allowedArgs} />
  {/if}
</section>
