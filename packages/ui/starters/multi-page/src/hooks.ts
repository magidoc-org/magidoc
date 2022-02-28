import type {
  RequestEvent,
  ResolveOptions,
  MaybePromise,
} from '@sveltejs/kit/types/internal'

export async function handle({
  event,
  resolve,
}: {
  event: RequestEvent
  resolve(event: RequestEvent, opts?: ResolveOptions): MaybePromise<Response>
}) {
  // Disable SSR for queries because of codemirror
  return await resolve(event, {
    ssr: false,
  })
}
