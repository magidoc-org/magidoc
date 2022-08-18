import { error } from '@sveltejs/kit';

export function load({ params, url }: LoadEvent): PageLoadOutput {
  const type = getTypeByName(params.type)
  const usages = getTypeUsages(type)

  const page = findPageByHref(url.pathname)

  if (!type || !page) {
    throw error(404, `Type ${params.type} not found.`);
  }

  return {
  type,
  usages,
  page,
}
}
