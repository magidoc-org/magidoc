<script lang="ts">
  import { SideNav, SideNavItems, SideNavMenu } from 'carbon-components-svelte'
  import Mutations from './Mutations.svelte'
  import Queries from './Queries.svelte'
  import Subscriptions from './Subscriptions.svelte'
  import { SelectableNavMenuItem } from '@magidoc/plugin-svelte-carbon-commons'
  import Types from './Types.svelte'
  import type { GraphQLSchema } from 'graphql'
  import _ from 'lodash'
  import { page } from '$app/stores'

  export let isOpen = true
  export let schema: GraphQLSchema
</script>

<SideNav {isOpen}>
  <SideNavItems>
    <SideNavMenu text="Introduction" expanded>
      <SelectableNavMenuItem
        href="/introduction/welcome"
        text="Welcome"
        currentRef={$page.url.pathname}
      />
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
