import type { Pages } from '$lib/pages'

/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
  interface Stuff {
    pages: Pages
  }
}
