import { redirect } from '@sveltejs/kit';
import type { LoadEvent, LoadOutput } from '@sveltejs/kit'

throw new Error("@migration task: Migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export function load({ stuff }: LoadEvent): PageLoadOutput {
  throw redirect(302, stuff.homeUrl);
}
