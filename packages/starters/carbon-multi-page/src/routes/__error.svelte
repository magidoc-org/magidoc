<script context="module" lang="ts">
  import type { LoadEvent } from '@sveltejs/kit'

  export function load({ error, status }: LoadEvent) {
    return {
      props: {
        status,
        error: error?.message,
      },
    }
  }
</script>

<script lang="ts">
  export let status: number | undefined
  export let error: string | undefined
</script>

<div class="wrapper">
  {#if status}
    <h1>{status}</h1>
  {/if}

  {#if error}
    <p>{error}</p>
  {:else}
    <p>An unexpected error occurred.</p>
  {/if}
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
