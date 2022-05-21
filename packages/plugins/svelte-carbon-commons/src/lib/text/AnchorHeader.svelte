<script lang="ts">
  import marked from 'marked'

  import HeadingAnchor from './HeadingAnchor.svelte'

  function generateHeaderId(value: string): string {
    const slugger = new marked.Slugger()
    return slugger.slug(value)
  }

  export let text: string
  export let depth: number
  export let showAnchor = true

  let visible = false

  let id: string
  $: id = generateHeaderId(text)
</script>

<svelte:element
  this={`h${depth}`}
  {id}
  class="header"
  on:mouseenter={() => (visible = true)}
  on:mouseleave={() => (visible = false)}
>
  <span>{text}</span>
  {#if depth > 1 && showAnchor}
    <HeadingAnchor {id} {visible} />
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
</style>
