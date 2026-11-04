<script lang="ts">
import { afterNavigate } from '$app/navigation'

type Heading = { id: string; text: string; depth: number }

const indents: Record<number, string> = { 2: 'pl-3', 3: 'pl-6', 4: 'pl-9' }
const headerOffset = 100

let headings: Heading[] = []
let elements: HTMLElement[] = []
let activeId = ''

function updateActive() {
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  const limit = atBottom ? window.innerHeight : headerOffset
  const passed = elements.filter((element) => element.getBoundingClientRect().top <= limit)
  activeId = (passed.at(-1) ?? elements[0])?.id ?? ''
}

afterNavigate(() => {
  elements = Array.from(document.querySelectorAll<HTMLElement>('main :is(h2, h3, h4)[id]')).filter((element) =>
    element.checkVisibility(),
  )
  headings = elements.map((element) => ({
    id: element.id,
    text: element.textContent?.trim() ?? '',
    depth: Number(element.tagName[1]),
  }))
  updateActive()
})
</script>

<svelte:window on:scroll={updateActive} on:resize={updateActive} />

{#if headings.length > 1}
  <nav
    aria-label="On this page"
    class="sticky top-16 hidden max-h-[calc(100dvh-4rem)] w-56 shrink-0 overflow-y-auto py-8 pr-4 xl:block"
  >
    <p class="mb-3 text-xs font-semibold tracking-wide text-surface-600-400 uppercase">On this page</p>
    <ul class="border-l border-surface-200-800 text-sm">
      {#each headings as heading}
        <li>
          <a
            href="#{heading.id}"
            class="-ml-px block border-l-2 py-1 pr-2 transition-colors {indents[heading.depth]} {activeId === heading.id
              ? 'border-primary-500 font-medium text-primary-700-300'
              : 'border-transparent text-surface-600-400 hover:text-surface-950-50'}"
          >
            {heading.text}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}
