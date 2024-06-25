<script lang="ts">
import { page } from '$app/stores'

let error: string
$: {
  const message: string = ($page.error as Error)?.message || 'An unexpected error occurred.'
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
