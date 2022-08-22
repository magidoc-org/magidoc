import type { MarkdownOptions } from '@magidoc/fuse-markdown'
import { mergeMarkdownOptions } from '@magidoc/fuse-markdown/build/indexer/indexer'
import {
  extract,
  IndexableMarkdownType,
} from '@magidoc/fuse-markdown/build/markdown/extract'
import Fuse from 'fuse.js'
import {
  GraphQLEnumType,
  GraphQLField,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLUnionType,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isObjectType,
  isScalarType,
  isUnionType,
} from 'graphql'
import {
  EnumSearchResult,
  GraphQLType,
  InputObjectSearchResult,
  InterfaceSearchResult,
  ObjectSearchResult,
  QuerySearchResult,
  ScalarSearchResult,
  SearchResult,
  SearchResultType,
  TypeSearchResult,
  UnionSearchResult,
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
    fuse.add(asTypeSearchResult(type, markdownOptions))
  })
}

function asTypeSearchResult(
  type: GraphQLNamedType,
  options: MarkdownOptions,
): TypeSearchResult {
  if (isEnumType(type)) {
    return asEnumSearchResult(type, options)
  } else if (isObjectType(type)) {
    return asObjectSearchResult(GraphQLType.OBJECT, type, options)
  } else if (isInterfaceType(type)) {
    return asObjectSearchResult(GraphQLType.INTERFACE, type, options)
  } else if (isScalarType(type)) {
    return asScalarSearchResult(type, options)
  } else if (isUnionType(type)) {
    return asUnionSearchResult(type, options)
  } else if (isInputObjectType(type)) {
    return asInputObjectType(type, options)
  }

  throw new Error(
    'This code block should be unreachable. If you ever receive this exception, it means you have an invalid setup using GraphQL.',
  )
}

function asInputObjectType(
  target: GraphQLInputObjectType,
  options: MarkdownOptions,
): InputObjectSearchResult {
  return {
    type: SearchResultType.TYPE,
    graphqlType: GraphQLType.INPUT_OBJECT,
    name: target.name,
    description: getDescription(target, options),
    fields: Object.values(target.getFields()).map((field) => ({
      name: field.name,
      description: getDescription(field, options),
    })),
  }
}
function asUnionSearchResult(
  target: GraphQLUnionType,
  options: MarkdownOptions,
): UnionSearchResult {
  return {
    type: SearchResultType.TYPE,
    graphqlType: GraphQLType.UNION,
    name: target.name,
    description: getDescription(target, options),
  }
}
function asScalarSearchResult(
  target: GraphQLScalarType,
  options: MarkdownOptions,
): ScalarSearchResult {
  return {
    type: SearchResultType.TYPE,
    graphqlType: GraphQLType.SCALAR,
    name: target.name,
    description: getDescription(target, options),
  }
}
function asObjectSearchResult(
  type: GraphQLType.OBJECT | GraphQLType.INTERFACE,
  target: GraphQLObjectType | GraphQLInterfaceType,
  options: MarkdownOptions,
): ObjectSearchResult | InterfaceSearchResult {
  return {
    type: SearchResultType.TYPE,
    graphqlType: type,
    name: target.name,
    description: getDescription(target, options),
    fields: Object.values(target.getFields()).map((field) => ({
      name: field.name,
      description: getDescription(field, options),
      arguments: field.args.map((arg) => ({
        name: arg.name,
        description: getDescription(arg, options),
      })),
    })),
  }
}

function asEnumSearchResult(
  target: GraphQLEnumType,
  options: MarkdownOptions,
): EnumSearchResult {
  return {
    name: target.name,
    description: getDescription(target, options),
    graphqlType: GraphQLType.ENUM,
    type: SearchResultType.TYPE,
    values: target.getValues().map((value) => ({
      value: value.name,
      description: getDescription(value, options),
    })),
  }
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

function asQueryResult(
  type: QuerySearchResult['type'],
  field: GraphQLField<unknown, unknown>,
  options: MarkdownOptions,
): QuerySearchResult {
  return {
    type: type,
    name: field.name,
    description: getDescription(field, options),
    arguments: field.args.map((arg) => ({
      name: arg.name,
      description: getDescription(arg, options),
    })),
  }
}

function getDescription(
  {
    description,
  }: {
    description: string | undefined | null
  },
  options: MarkdownOptions,
): string | undefined {
  if (!description) return undefined
  if (description.trim().length === 0) return undefined
  return extract(description, {
    extractors: options.extractors,
    lexer: options.lexerFactory(),
    slugger: options.sluggerFactory(),
  })
    .map((value) => {
      switch (value.type) {
        case IndexableMarkdownType.SECTION:
          return value.content
        case IndexableMarkdownType.HEADER:
          return ''
      }
    })
    .join('\n')
}
