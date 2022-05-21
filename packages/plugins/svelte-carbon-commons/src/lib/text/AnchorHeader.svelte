<script lang="ts">
  export let id: string
  export let depth: number

  let anchorVisible = false
</script>

<svelte:element
  this={`h${depth}`}
  {id}
  class="header"
  on:mouseenter={() => (anchorVisible = true)}
  on:mouseleave={() => (anchorVisible = false)}
>
  <slot />
  {#if depth > 1 && anchorVisible}
    <span class="hashtag"><a href={`#${id}`}>#</a></span>
  {/if}
</svelte:element>

<style>
  .header {
    display: flex;
    align-items: center;

    /*
      * Trick to have headers at the right place when scrolling to the header
      */
    padding-top: 3.2rem;
    margin-top: -2.8rem !important;
  }

  .hashtag {
    font-size: 70%;
    height: 100%;
    padding-left: 0.5rem;
    vertical-align: middle;
    cursor: pointer;
  }
  .hashtag a {
    color: inherit;
    text-decoration: none;
  }

  .hashtag:hover {
    color: #ff9900;
  }
</style>
