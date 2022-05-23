<script lang="ts">
  export let id: string
  export let depth: number
</script>

<svelte:element this={`h${depth}`} {id} class="header">
  <slot />
  {#if depth > 1}
    <a href={`#${id}`} class="hashtag">#</a>
    <span {id} class="anchor" />
  {/if}
</svelte:element>

<style>
  .header {
    display: flex;
    align-items: center;
    margin-top: 1.8rem;
  }

  .header:hover .hashtag {
    opacity: 1;
  }

  .hashtag {
    font-size: 70%;
    height: 100%;
    padding-left: 0.5rem;
    vertical-align: middle;
    cursor: pointer;
    opacity: 0;
    color: inherit;
    text-decoration: none;
  }

  .hashtag:hover {
    color: #ff9900;
  }
</style>
