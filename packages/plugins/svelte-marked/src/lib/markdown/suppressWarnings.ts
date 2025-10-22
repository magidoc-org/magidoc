import { onMount } from 'svelte'

export function suppressWarnings() {
  // biome-ignore lint/suspicious/noConsole: This is fine here
  const origWarn = console.warn

  console.warn = (message: string) => {
    if (message.includes('unknown prop')) return
    if (message.includes('unexpected slot')) return
    origWarn(message)
  }

  onMount(() => {
    console.warn = origWarn
  })
}
