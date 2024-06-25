<script lang="ts">
import CarbonMarkdown from '$lib/components/markdown/CarbonMarkdown.svelte'

import type { PossibleDescription } from '$lib/model'

export let item: PossibleDescription
</script>

By <em>{item.from.name}</em>
<CarbonMarkdown source={item.description} />
