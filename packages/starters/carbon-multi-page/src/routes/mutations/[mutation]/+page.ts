import { error } from '@sveltejs/kit';

export function load({ params, url }: LoadEvent): PageLoadOutput {
  const field = getMutationByName(params.mutation)
  const page = findPageByHref(url.pathname)

  if (!field || !page) {
    throw error(404, `Mutation ${params.mutation} not found.`);
  }

  return {
  field,
  page,
}
}
