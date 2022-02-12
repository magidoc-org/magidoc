<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit'

  /** @type {import('@sveltejs/kit').Load} */
  export function load({ params }: LoadInput): LoadOutput {
    return {
      props: {
        queryName: params.name,
      },
    }
  }
</script>

<script lang="ts">
  import { page } from "$app/stores";

  const queryName = $page.params.query
</script>

<section>
  {queryName}
</section>
