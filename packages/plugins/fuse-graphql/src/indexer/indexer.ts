import { mergeMarkdownOptions } from '@magidoc/plugin-fuse-markdown'
import type { MarkdownOptions } from '@magidoc/plugin-fuse-markdown'
import Fuse from 'fuse.js'
import type { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { asQueryResult } from './graphql/queries'
import { asTypeSearchResult } from './graphql/types'
import {
  type QuerySearchResult,
  type SearchResult,
  SearchResultType,
} from './result'

export type IndexingOptions = {
  /**
   * The fuse index to which the indexed markdown document parts will be added.
   *
   * You can use the `defaultFuseOptions` function to get a default options object.
   */
  fuse?: Fuse<SearchResult>
  /**
   * The markdown options that are used to extract the markdown parts.
   */
  markdown?: Partial<MarkdownOptions>
}

export function defaultFuseOptions(): Fuse.IFuseOptions<SearchResult> {
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
      // For queries
      {
        name: 'arguments.name',
        weight: 1.2,
      },
      {
        name: 'arguments.description',
        weight: 1.0,
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
    minMatchCharLength: 3,
    threshold: 0.2,
    includeMatches: true,
    includeScore: true,
  }
}

export function index(
  schema: GraphQLSchema,
  options?: IndexingOptions,
): Fuse<SearchResult> {
  const fuse = options?.fuse ?? new Fuse<SearchResult>([], defaultFuseOptions())
  const markdownOptions = mergeMarkdownOptions(options?.markdown)
  indexAllFieldsOf(
    SearchResultType.QUERY,
    schema.getQueryType(),
    fuse,
    markdownOptions,
  )
  indexAllFieldsOf(
    SearchResultType.MUTATION,
    schema.getMutationType(),
    fuse,
    markdownOptions,
  )
  indexAllFieldsOf(
    SearchResultType.SUBSCRIPTION,
    schema.getSubscriptionType(),
    fuse,
    markdownOptions,
  )

  indexAllTypes(schema, fuse, markdownOptions)
  return fuse
}

function indexAllTypes(
  schema: GraphQLSchema,
  fuse: Fuse<SearchResult>,
  markdownOptions: MarkdownOptions,
) {
  Object.values(schema.getTypeMap()).forEach((type) => {
    if (
      type === schema.getQueryType() ||
      type === schema.getMutationType() ||
      type === schema.getSubscriptionType() ||
      type.name.startsWith('__')
    ) {
      return
    }

    fuse.add(asTypeSearchResult(type, markdownOptions))
  })
}

function indexAllFieldsOf(
  type: QuerySearchResult['type'],
  target: GraphQLObjectType | undefined | null,
  fuse: Fuse<SearchResult>,
  options: MarkdownOptions,
) {
  if (!target) return
  Object.values(target.getFields()).forEach((field) => {
    fuse.add(asQueryResult(type, field, options))
  })
}
