import type { MarkdownOptions } from '@magidoc/fuse-markdown'
import Fuse from 'fuse.js'
import type { GraphQLSchema } from 'graphql'
import type { SearchResult } from './result'

export type IndexingOptions<T> = {
  /**
   * The fuse index to which the indexed markdown document parts will be added.
   *
   * You can use the `defaultFuseOptions` function to get a default options object.
   */
  fuse?: Fuse<SearchResult<T>>
  /**
   * The markdown options that are used to extract the markdown parts.
   */
  markdown?: Partial<MarkdownOptions>
}

export function defaultFuseOptions<T>(): Fuse.IFuseOptions<SearchResult<T>> {
  return {
    keys: [
      {
        name: 'name',
        weight: 1.5,
      },
      {
        name: 'description',
        weight: 1,
      },
      // For enums
      {
        name: 'values.value',
        weight: 1.2,
      },
      {
        name: 'values.description',
        weight: 1.0,
      },
      // For objects, interfaces and input objects
      {
        name: 'fields.name',
        weight: 1.2,
      },
      {
        name: 'fields.description',
        weight: 1.0,
      },
      {
        name: 'fields.arguments.name',
        weight: 0.9,
      },
      {
        name: 'fields.arguments.description',
        weight: 0.8,
      },
    ],
    distance: 100,
    threshold: 0.3,
    includeMatches: true,
    includeScore: true,
  }
}

export function index<T>(
  schema: GraphQLSchema,
  options?: IndexingOptions<T>,
): Fuse<SearchResult<T>> {
  const fuse =
    options?.fuse ?? new Fuse<SearchResult<T>>([], defaultFuseOptions())

  return fuse
}
