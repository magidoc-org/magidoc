<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit'

  export function load({ stuff }: LoadInput): LoadOutput {
    return {
      status: 302,
      redirect: stuff.homeUrl,
    }
  }
</script>
