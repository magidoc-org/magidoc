<script lang="ts">
import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte'
import { type MagidocSearchResult, search } from '#lib/search'
import AppSearchResult from './search/AppSearchResult.svelte'

export let open = false

let query = ''
let active = 0
let list: HTMLElement
let results: ReadonlyArray<MagidocSearchResult>
$: results = search(query)

function onKeydown(event: KeyboardEvent) {
  const links = list.querySelectorAll('a')
  if (links.length === 0) return

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    active = (active + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length
    links[active].scrollIntoView({ block: 'nearest' })
  } else if (event.key === 'Enter') {
    event.preventDefault()
    links[active]?.click()
  }
}
</script>

<Dialog {open} onOpenChange={(details) => (open = details.open)}>
  <Portal>
    <Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/60 backdrop-blur-sm" />
    <Dialog.Positioner class="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh]">
      <Dialog.Content class="card flex max-h-[80vh] w-full max-w-2xl flex-col gap-3 bg-surface-100-900 p-4 shadow-xl">
        <Dialog.Title class="sr-only">Search</Dialog.Title>
        <input
          class="input"
          type="search"
          placeholder="Search..."
          autocomplete="off"
          bind:value={query}
          on:input={() => (active = 0)}
          on:keydown={onKeydown}
        />
        <div class="flex flex-col gap-2 overflow-y-auto" bind:this={list}>
          {#each results as item, index}
            <div data-active={index === active || undefined} on:mousemove={() => (active = index)} role="presentation">
              <AppSearchResult {item} on:click={() => (open = false)} />
            </div>
          {/each}
          {#if query.trim() && results.length === 0}
            <p class="py-6 text-center text-sm text-surface-600-400">No results for “{query.trim()}”.</p>
          {/if}
        </div>
        <p class="flex gap-4 text-xs text-surface-600-400">
          <span><kbd class="kbd">↑</kbd> <kbd class="kbd">↓</kbd> to navigate</span>
          <span><kbd class="kbd">↵</kbd> to open</span>
          <span><kbd class="kbd">esc</kbd> to close</span>
        </p>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog>
