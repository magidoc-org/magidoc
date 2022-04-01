<script lang="ts">
  import type { CurrentPage } from '$lib/pages'
  import { Button } from 'carbon-components-svelte'
  import { ArrowLeft16, ArrowRight16 } from 'carbon-icons-svelte'

  export let currentPage: CurrentPage
</script>

<div class="previous-next-button-container">
  <div>
    {#if currentPage.previous}
      <Button
        expressive
        kind="tertiary"
        icon={ArrowLeft16}
        class="inverted"
        href={currentPage.previous.href}
      >
        <div>
          <div class="direction">Previous</div>
          <div>{currentPage.previous.name}</div>
        </div>
      </Button>
    {/if}
  </div>

  <div>
    {#if currentPage.next}
      <Button
        expressive
        kind="tertiary"
        icon={ArrowRight16}
        href={currentPage.next.href}
      >
        <div>
          <div class="direction">Next</div>
          <div style="text-overflow: ellipsis">{currentPage.next.name}</div>
        </div>
      </Button>
    {/if}
  </div>
</div>

<style>
  .previous-next-button-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 1rem;
    align-items: stretch;
  }

  :global(.previous-next-button-container > div) {
    flex: 1 1 0;
  }

  :global(.previous-next-button-container .bx--btn) {
    width: 100% !important;
    min-width: 12rem;
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
      font-size: 0.8rem;
  }
</style>
