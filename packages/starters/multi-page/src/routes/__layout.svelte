<script lang="ts" context="module">
  import {
    buildClientSchema,
    GraphQLSchema,
    type IntrospectionQuery,
  } from 'graphql'

  export async function load({ fetch }: LoadInput): Promise<LoadOutput> {
    const schemaJson = (await fetch('/_schema.json').then((response) =>
      response.json(),
    )) as IntrospectionQuery
    const schema = buildClientSchema(schemaJson)

    return {
      stuff: {
        schema,
      },
      props: {
        schema,
      },
    }
  }
</script>

<script lang="ts">
  import '../app.css'

  import { Content, Row, Grid, Column } from 'carbon-components-svelte'
  import AppHeader from '$lib/layout/AppHeader.svelte'
  import AppNavigation from '$lib/layout/nav/AppNavigation.svelte'
  import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/internal'

  let isSideNavOpen: boolean

  export let schema: GraphQLSchema
</script>

<main>
  <AppHeader bind:isSideNavOpen />
  <AppNavigation isOpen={isSideNavOpen} {schema} />

  <Content>
    <Grid>
      <Row>
        <Column>
          <slot />
        </Column>
      </Row>
    </Grid>
  </Content>
</main>
