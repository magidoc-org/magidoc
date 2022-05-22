<script type="ts">
  import Prism from '@magidoc/plugin-svelte-prismjs'
  import 'prismjs/components/prism-graphql.js'
  import 'prismjs/components/prism-json.js'

  import { Button } from 'carbon-components-svelte'
  import Add from 'carbon-icons-svelte/lib/Add.svelte'
  import Copy from 'carbon-icons-svelte/lib/Copy.svelte'
  import Subtract from 'carbon-icons-svelte/lib/Subtract.svelte'
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
    <Prism source={code} {language} maxHeight={'20rem'} />
  </div>
  <div class="button-bar">
    <Button
      kind={'ghost'}
      icon={Copy}
      iconDescription={copyButtonText}
      tooltipPosition={'left'}
      on:click={() => copy(code)}
    />
    <Button
      kind={'ghost'}
      icon={Add}
      iconDescription={'Increase query depth'}
      tooltipPosition={'left'}
      on:click={() => graphqlQuery.increaseDepth()}
    />
    <p style="text-align:center">
      {$graphqlQuery.depth}
    </p>
    <Button
      kind={'ghost'}
      icon={Subtract}
      iconDescription={'Decrease query depth'}
      tooltipPosition={'left'}
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
    overflow: hidden;
  }

  .button-bar {
    display: flex;
    flex-direction: column;
  }
</style>
