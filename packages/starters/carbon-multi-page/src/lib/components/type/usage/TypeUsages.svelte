<script lang="ts">
import AnchorHeader from '$lib/components/common/text/AnchorHeader.svelte';

  import {
    type TypeReverseMapping,
    ReferenceKind,
  } from '@magidoc/plugin-reverse-schema-mapper'
  import { ListItem, UnorderedList } from 'carbon-components-svelte'
  import TypeLink from '../TypeLink.svelte'
  import TypeUsagePreview from './TypeUsagePreview.svelte'

  export let usages: TypeReverseMapping

  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
</script>

<AnchorHeader id={'usages'} depth={2}>Usages</AnchorHeader>
<AnchorHeader id={'references'} depth={4}>References</AnchorHeader>
<TypeUsagePreview items={usages.references} let:index>
  <UnorderedList>
    {@const item = usages.references[index]}
    <ListItem>
      {#if item.kind === ReferenceKind.UNION && item.by}
        Part of union <TypeLink type={item.by} />
      {:else if item.kind === ReferenceKind.FIELD}
        Field <em>{item.by.name}</em> from <TypeLink type={item.parent} />
      {:else if item.kind === ReferenceKind.ARGUMENT}
        Argument <em>{item.by.name}</em> of field <em>{item.field.name}</em>
        from type <TypeLink type={item.type} />
      {/if}
    </ListItem>
  </UnorderedList>
</TypeUsagePreview>
