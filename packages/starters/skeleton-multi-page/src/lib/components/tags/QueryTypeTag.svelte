<script lang="ts">
import type { QueryType } from '@magidoc/plugin-query-generator'
import _ from 'lodash'
import AppTag from '../common/AppTag.svelte'

export let type: QueryType
</script>

<AppTag color="green">{_.capitalize(type.toLowerCase())}</AppTag>
