<script lang="ts">
  import { SideNav, SideNavItems, SideNavMenu } from 'carbon-components-svelte'
  import Mutations from './Mutations.svelte'
  import Queries from './Queries.svelte'
  import Subscriptions from './Subscriptions.svelte'
  import SelectableNavMenuItem from '$lib/components/nav/SelectableNavMenuItem.svelte'
  import Types from './Types.svelte'
  import type { GraphQLSchema } from 'graphql'
  import _ from 'lodash'

  export let isOpen = true
  export let schema: GraphQLSchema
</script>

<SideNav {isOpen}>
  <SideNavItems>
    <SideNavMenu text="Introduction" expanded>
      <SelectableNavMenuItem href="/introduction/welcome" text="Welcome" />
    </SideNavMenu>
    <Queries type={schema.getQueryType()} />
    <Mutations type={schema.getMutationType()} />
    <Subscriptions type={schema.getSubscriptionType()} />
    <Types
      types={_.map(schema.getTypeMap(), (type) => type).filter(
        (type) =>
          !type.name.startsWith('__') &&
          type !== schema.getQueryType() &&
          type !== schema.getMutationType() &&
          type !== schema.getSubscriptionType(),
      )}
    />
  </SideNavItems>
</SideNav>
