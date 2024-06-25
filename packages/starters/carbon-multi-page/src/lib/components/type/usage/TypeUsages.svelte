<script lang="ts">
import AppList from '$lib/components/common/list/AppList.svelte'
import AppListItem from '$lib/components/common/list/AppListItem.svelte'

import AnchorHeader from '$lib/components/common/text/AnchorHeader.svelte'

import { ReferenceKind, type TypeReverseMapping } from '@magidoc/plugin-reverse-schema-mapper'
import TypeLink from '../../common/text/TypeLink.svelte'
import TypeUsagePreview from './TypeUsagePreview.svelte'

export let usages: TypeReverseMapping
</script>

<AnchorHeader id={'usages'} depth={2}>Usages</AnchorHeader>
<AnchorHeader id={'references'} depth={4}>References</AnchorHeader>
<TypeUsagePreview items={usages.references} let:index>
  <AppList>
    {@const item = usages.references[index]}
    <AppListItem>
      {#if item.kind === ReferenceKind.UNION && item.by}
        Part of union <TypeLink type={item.by} />
      {:else if item.kind === ReferenceKind.FIELD}
        Field <em>{item.by.name}</em> from <TypeLink type={item.parent} />
      {:else if item.kind === ReferenceKind.ARGUMENT}
        Argument <em>{item.by.name}</em> of field <em>{item.field.name}</em>
        from type <TypeLink type={item.type} />
      {/if}
    </AppListItem>
  </AppList>
</TypeUsagePreview>
