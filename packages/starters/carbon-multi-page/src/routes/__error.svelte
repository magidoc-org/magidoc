<script context="module" lang="ts">
  import type { LoadEvent } from '@sveltejs/kit'

  export function load({ error, status }: LoadEvent) {
    const actualError =
      error?.message?.trim() || 'An unexpected error occurred.'
    return {
      props: {
        status,
        error: actualError.endsWith('.') ? actualError : `${actualError}.`,
      },
    }
  }
</script>

<script lang="ts">
  export let status: number | undefined
  export let error: string
</script>

<div class="wrapper">
  {#if status}
    <h1>{status}</h1>
  {/if}

  <p>{error}</p>
</div>

<style>
  .wrapper {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 3rem);
  }
</style>
