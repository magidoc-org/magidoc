/// <reference types="@sveltejs/kit" />

import type { Pages } from "$lib/pages";

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
	 interface Stuff {
        pages: Pages
    }
}
