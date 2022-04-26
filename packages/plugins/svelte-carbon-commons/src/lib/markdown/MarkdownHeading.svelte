<script lang="ts">
  import MarkdownHeadingAnchor from './MarkdownHeadingAnchor.svelte'

  function generateHeaderId(value: string): string {
    // https://github.com/markedjs/marked/blob/master/src/Slugger.js
    return (
      value
        .toLowerCase()
        .trim()
        // remove html tags
        .replace(/<[!\/a-z].*?>/gi, '')
        // remove unwanted chars
        .replace(
          /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
          '',
        )
        .replace(/\s/g, '-')
    )
  }

  export let text: string
  export let depth: number

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
  {#if depth > 1}
    <MarkdownHeadingAnchor {id} {visible} />
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
