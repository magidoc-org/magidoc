<script lang="ts">
  import type { CurrentPage } from '$lib/pages'
  import { Button } from 'carbon-components-svelte'
  import ArrowLeft from 'carbon-icons-svelte/lib/ArrowLeft.svelte'
  import ArrowRight from 'carbon-icons-svelte/lib/ArrowRight.svelte'

  export let currentPage: CurrentPage
</script>

<div class="previous-next-button-container">
  {#if currentPage.previous}
    <div>
      <Button
        kind="tertiary"
        icon={ArrowLeft}
        class="inverted"
        href={currentPage.previous.href}
      >
        <div>
          <div class="direction">Previous</div>
          <div>{currentPage.previous.name}</div>
        </div>
      </Button>
    </div>
  {/if}

  {#if currentPage.next}
    <div>
      <Button kind="tertiary" icon={ArrowRight} href={currentPage.next.href}>
        <div>
          <div class="direction">Next</div>
          <div style="text-overflow: ellipsis">{currentPage.next.name}</div>
        </div>
      </Button>
    </div>
  {/if}
</div>

<style>
  .previous-next-button-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    grid-column-gap: 4rem;
    grid-row-gap: 1rem;
    align-items: stretch;
  }

  :global(.previous-next-button-container > div) {
    flex: 1 1 0;
  }

  :global(.previous-next-button-container .bx--btn) {
    width: 100% !important;
    min-width: 14rem;
    max-width: inherit;
    height: 100%;
  }

  :global(.previous-next-button-container .inverted) {
    flex-direction: row-reverse;
    text-align: right;
    padding: calc(0.875rem - 3px) 15px calc(0.875rem - 3px) 63px;
  }

  :global(.previous-next-button-container .inverted > svg) {
    left: 1rem;
    right: inherit;
  }

  .direction {
    font-weight: lighter;
    font-size: 0.7rem;
  }
</style>
