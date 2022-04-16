<script lang="ts" context="module">
  import {
    buildClientSchema,
    GraphQLSchema,
    type IntrospectionQuery,
  } from 'graphql'
  import schemaJson from '../_schema.json'

  export function load(): LoadOutput {
    const schema = buildClientSchema(
      schemaJson as unknown as IntrospectionQuery,
    )

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
  import type { LoadOutput } from '@sveltejs/kit/types/internal'

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
