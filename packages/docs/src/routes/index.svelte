<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/internal'

  export function load({ stuff }: LoadInput): LoadOutput {
    if (!stuff.pages) {
      return {
        status: 404,
      }
    }

    return {
      status: 302,
      redirect: stuff.pages.values[0].href as unknown as string,
    }
  }
</script>
