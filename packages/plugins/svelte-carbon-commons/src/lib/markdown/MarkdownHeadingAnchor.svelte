<script lang="ts">
  export let id: string
  export let visible: boolean
</script>

{#if visible}
  <span class="hashtag"><a href={`#${id}`}>#</a></span>
{/if}

<style>
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
