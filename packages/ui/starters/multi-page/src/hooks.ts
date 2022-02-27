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
  // SSR is useless since we do a static website
  return await resolve(event, {
    ssr: false,
  })
}
