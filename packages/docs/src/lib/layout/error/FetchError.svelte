<script lang="ts">
    export let status: number
</script>

{#if status === 404}
    Woops, your page was not found :(
{:else}
    Server responded with invalid status {status}
{/if}