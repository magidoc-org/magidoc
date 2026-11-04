<script lang="ts">
export let id: string
export let depth: number

const sizes = [
  'text-3xl font-bold tracking-tight',
  'text-2xl font-semibold tracking-tight',
  'text-xl font-semibold',
  'text-lg font-semibold',
  'text-base font-semibold',
  'text-base font-semibold',
]

$: size = sizes[depth - 1] ?? sizes[sizes.length - 1]
</script>

<div class="parent">
  <svelte:element this={`h${depth}`} {id} class="header header-base {size} [&_.badge]:ml-1 [&_.badge]:-translate-y-[0.1em] [&_.badge]:px-2.5 [&_.badge]:py-1 [&_.badge]:align-middle [&_.badge]:text-sm">
    <slot />
  </svelte:element>
  {#if depth > 1}
    <svelte:element this={`h${depth}`} class="header-base header-hashtag {size}">
      <a href={`#${id}`} class="hashtag">#</a>
    </svelte:element>
  {/if}
</div>

<style>
  .parent {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
  }

  .header-base {
    display: block;
    margin-top: 1.8rem;
  }

  .header {
    word-break: break-all;
  }

  .parent:hover .hashtag {
    opacity: 1;
  }

  .header-hashtag {
    margin-bottom: 0.1rem;
  }

  .hashtag {
    font-size: 70%;
    height: 100%;
    margin-left: 0.5rem;
    vertical-align: middle;
    cursor: pointer;
    opacity: 0;
    color: inherit;
    text-decoration: none;
    flex: 2;
  }

  .hashtag:hover {
    color: var(--color-primary-500);
  }
</style>
