<script lang="ts">
  export let href: string
  export let title: string | undefined
  export let text: string | undefined
</script>

<img src={href} {title} alt={text} class="markdown-image" />

<style>
  .markdown-image {
    max-width: 100%;
  }
</style>
