<script lang="ts">
import type { QueryType } from '@magidoc/plugin-query-generator'
import { Tag } from 'carbon-components-svelte'
import _ from 'lodash'

export let type: QueryType
</script>

<Tag type="green">{_.capitalize(type.toLowerCase())}</Tag>
