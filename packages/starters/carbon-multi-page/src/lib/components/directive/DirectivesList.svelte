<script lang="ts">
import type { ConstDirectiveNode } from 'graphql'
import DirectiveTag from '../tags/DirectiveTag.svelte'

export let directives: ReadonlyArray<ConstDirectiveNode> | undefined
</script>

{#if directives}
    {#each directives as directive}
        <DirectiveTag {directive} />
    {/each}
{/if}