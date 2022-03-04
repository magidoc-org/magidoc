<script>
  import { Link } from 'carbon-components-svelte'
</script>

<svelte:head>
  <title>Welcome</title>
</svelte:head>

<section>
  <h1>Welcome</h1>
  <div>
    <p>
      Welcome to <strong>Magidoc</strong>! Magidoc is a free open source
      software to easily create a static documentation website for your GraphQL
      API.
    </p>
    <br />
    <p>
      Magidoc is a simple wrapper around a <Link href="https://svelte.dev/"
        >Svelte</Link
      >
      Project to simplify your setup. It will automatically generate static assets
      about your GraphQL API you can access throughout the application to generate
      whatever you want. It is based upon
      <Link href="https://kit.svelte.dev/">Svelte Kit</Link>, a framework to
      develop web applications with file-system based routing. For React
      Developers, this is similar to <Link href="https://nextjs.org/">Next</Link
      >, but for Svelte!
    </p>
    <br />
    <p>
      Play around with this starter project, everything in here can be modified
      at will. Possibilities are endless!
    </p>
  </div>
</section>
