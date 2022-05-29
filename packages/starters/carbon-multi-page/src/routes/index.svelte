<script context="module" lang="ts">
  import type { LoadEvent, LoadOutput } from '@sveltejs/kit'

  export function load({ stuff }: LoadEvent): LoadOutput {
    return {
      status: 302,
      redirect: stuff.homeUrl,
    }
  }
</script>
