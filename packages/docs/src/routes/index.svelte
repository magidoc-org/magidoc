<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/internal'

  export function load({ stuff }: LoadInput): LoadOutput {
    return {
      status: 302,
      redirect: stuff.pages.values[0].href as unknown as string,
    }
  }
</script>
