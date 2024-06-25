<script lang="ts">
import type { Page } from '@magidoc/plugin-starter-common'
import { ArrowLeft, ArrowRight } from 'carbon-icons-svelte'

export let page: Page
</script>

<hr class="footer-hr" />

<div class="wrapper">
  <div class="previous direction-wrapper">
    {#if page.previous}
      <div class="direction">
        <strong>
          Previous

          {#if page.previous.section && page.previous.section !== page.section}
            - {page.previous.section}
          {/if}
        </strong>
      </div>
      <a href={page.previous.href} class="title">
        <span><ArrowLeft class="previous-next-arrow" size={20} /></span>
        <p>{page.previous.title}</p>
      </a>
    {/if}
  </div>

  <div class="next direction-wrapper">
    {#if page.next}
      <div class="direction">
        <strong>
          Next
          {#if page.next.section && page.next.section !== page.section}
            - {page.next.section}
          {/if}
        </strong>
      </div>
      <a href={page.next.href} class="title">
        <p>{page.next.title}</p>
        <span><ArrowRight class="previous-next-arrow" size={20} /></span>
      </a>
    {/if}
  </div>
</div>

<style>
  .footer-hr {
    margin-top: 3rem;
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 3rem;
    margin-bottom: 1rem;
  }

  .direction-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
  }

  .direction-wrapper > div {
    margin-bottom: 0.5rem;
  }

  .direction-wrapper .direction {
    font-size: larger;
  }

  .title {
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  .previous {
    align-items: flex-start;
  }

  .next {
    align-items: flex-end;
  }

  :global(.next .previous-next-arrow) {
    margin-left: 0.3rem;
  }

  :global(.previous .previous-next-arrow) {
    margin-right: 0.3rem;
  }

  :global(.previous-next-arrow) {
    opacity: 0;
    display: none;
  }

  .title:hover :global(.previous-next-arrow) {
    display: block;
    -webkit-animation: fadeIn 0.3s;
    animation: fadeIn 0.3s;
    transition-property: opacity;
    transition: cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
    opacity: 1;
  }

  .title:hover {
    color: #bc7304;
    transition: cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
  }

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
