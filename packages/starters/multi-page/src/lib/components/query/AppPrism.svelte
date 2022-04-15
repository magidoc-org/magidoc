<script type="ts">
  import './prism-theme.css'
  import Prism from '@magidoc/plugin-svelte-prismjs'
  import 'prismjs/components/prism-graphql'
  import 'prismjs/components/prism-json'

  import { Button } from 'carbon-components-svelte'
  import { Add16, Copy16, Subtract16 } from 'carbon-icons-svelte'
  import { graphqlQuery } from './stores'

  export let code: string
  export let language: 'graphql' | 'json'

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
</script>

<div class="wrapper">
  <div class="code-section">
    <Prism source={code} {language} showLineNumbers={false}  showCopyButton/>
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

  .code-section {
    width: 100%;
  }

  .button-bar {
    display: flex;
    flex-direction: column;
  }
</style>
