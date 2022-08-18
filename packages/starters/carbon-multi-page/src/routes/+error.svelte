<script context="module" lang="ts">
  throw new Error(
    '@migration task: Replace error load function (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3293209)',
  )

  // import type { LoadEvent } from '@sveltejs/kit'

  // export function load({ error, status }: LoadEvent) {
  //   const actualError =
  //     error?.message?.trim() || 'An unexpected error occurred.'
  //   return {
  //     props: {
  //       status,
  //       error: actualError.endsWith('.') ? actualError : `${actualError}.`,
  //     },
  //   }
  // }
</script>

<script lang="ts">
  import { page } from '$app/stores'

  let error: string
  $: {
    const message =
      $page.error?.message?.trim() || 'An unexpected error occurred.'
    error = message.endsWith('.') ? message : `${message}.`
  }
</script>

<svelte:head>
  <title>Error - {$page.status}</title>
</svelte:head>

<div class="wrapper">
  <h1>{$page.status}</h1>

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
