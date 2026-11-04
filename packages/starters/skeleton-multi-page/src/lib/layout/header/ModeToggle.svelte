<script lang="ts">
import { Moon, Sun } from 'carbon-icons-svelte'
import { onMount } from 'svelte'

let dark = false

onMount(() => {
  dark = document.documentElement.dataset.mode === 'dark'
})

function toggle() {
  dark = !dark
  const mode = dark ? 'dark' : 'light'
  document.documentElement.dataset.mode = mode
  try {
    localStorage.setItem('mode', mode)
  } catch {}
}
</script>

<button
  type="button"
  class="btn-icon hover:preset-tonal"
  aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
  title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
  on:click={toggle}
>
  <svelte:component this={dark ? Sun : Moon} size={20} />
</button>
