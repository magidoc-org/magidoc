<script type="ts">
  import 'code-mirror-themes/themes/monokai.css'
  import 'code-mirror-themes/themes/idle.css'

  import { Button } from 'carbon-components-svelte'
  import { Add16, Copy16, Subtract16 } from 'carbon-icons-svelte'
  import { graphqlQuery } from './stores'
  import { theme } from '$lib/theme'
  import { browser } from '$app/env'
  import { onMount } from 'svelte'

  export let code: string
  export let height: number | 'auto'
  export let mode: 'graphql' | 'graphql-variables' | 'graphql-results'

  let copyButtonText = 'Copy query'

  export let copy = async (text: string) => {
    try {
      copyButtonText = 'Copied!'
      await navigator.clipboard.writeText(text)
      setTimeout(() => {
        copyButtonText = 'Copy query'
      }, 1500)
    } catch (e) {
      console.log(e)
    }
  }

  let CodeMirror: unknown 
  onMount(async () => {
    CodeMirror = (await import('@magidoc/plugin-code-mirror')).default
  })
  $: codeMirrorTheme = $theme.value === 'g10' ? 'idle' : 'monokai'
</script>

<div class="wrapper">
  <div class="code-mirror-section">
    {#if browser}
      <svelte:component
        this={CodeMirror}
        {code}
        {mode}
        {height}
        theme={codeMirrorTheme}
        showLineNumbers={false}
      />
    {/if}
  </div>
  <div class="button-bar">
    <Button
      kind={'ghost'}
      icon={Copy16}
      iconDescription={copyButtonText}
      tooltipPosition={'left'}
      hasIconOnly
      on:click={() => copy(code)}
    />
    <Button
      kind={'ghost'}
      icon={Add16}
      iconDescription={'Increase query depth'}
      tooltipPosition={'left'}
      hasIconOnly
      on:click={() => graphqlQuery.increaseDepth()}
    />
    <p style="text-align:center">
      {$graphqlQuery?.depth}
    </p>
    <Button
      kind={'ghost'}
      icon={Subtract16}
      iconDescription={'Decrease query depth'}
      tooltipPosition={'left'}
      hasIconOnly
      on:click={() => graphqlQuery.decreaseDepth()}
    />
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    justify-content: flex-start;
  }

  .code-mirror-section {
    width: 100%;
  }

  .button-bar {
    display: flex;
    flex-direction: column;
  }
</style>
