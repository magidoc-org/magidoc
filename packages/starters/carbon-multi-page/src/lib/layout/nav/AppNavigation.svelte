<script lang="ts">
  import { SideNav, SideNavItems } from 'carbon-components-svelte'
  import Mutations from './Mutations.svelte'
  import Queries from './Queries.svelte'
  import Subscriptions from './Subscriptions.svelte'
  import Types from './Types.svelte'
  import type { GraphQLSchema } from 'graphql'
  import _ from 'lodash'
  import type { CustomContent } from 'src/app'
  import CustomContents from './CustomContents.svelte'

  export let isOpen = true
  export let schema: GraphQLSchema
  export let content: CustomContent[]
</script>

<SideNav {isOpen}>
  <SideNavItems>
    <CustomContents {content} />
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
