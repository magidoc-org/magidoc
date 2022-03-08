<script lang="ts">
  import type { QueryType } from '@magidoc/core'
  import { Tag } from 'carbon-components-svelte'
  import _ from 'lodash'

  export let type: QueryType
</script>

<Tag type="green">{_.capitalize(type.toLowerCase())}</Tag>
