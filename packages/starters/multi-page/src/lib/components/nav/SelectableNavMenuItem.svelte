<script type="ts">
import { SideNavMenuItem } from "carbon-components-svelte";
import { page } from '$app/stores'
import { prefetch } from "$app/navigation";

export let href: string
export let text: string

prefetch(href)
</script>

<SideNavMenuItem {href} {text} isSelected={$page.url.pathname === href} {...$$restProps} />
