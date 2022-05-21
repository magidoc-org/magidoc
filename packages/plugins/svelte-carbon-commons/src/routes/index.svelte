<script>
  import CarbonMarkdown from '$lib/markdown/CarbonMarkdown.svelte'
</script>

<CarbonMarkdown
  source={`
this is a test

:::container
this should render a custom container
:::
`}
  base={'/'}
/>
