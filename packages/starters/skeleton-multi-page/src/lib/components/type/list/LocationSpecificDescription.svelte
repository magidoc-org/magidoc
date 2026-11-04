<script lang="ts">
import AppMarkdown from '$lib/components/markdown/AppMarkdown.svelte'

import type { PossibleDescription } from '$lib/model'

export let item: PossibleDescription
</script>

By <em>{item.from.name}</em>
<AppMarkdown source={item.description} />
