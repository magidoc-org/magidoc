import schemaJson from '../../static/_schema.json'
import { buildClientSchema } from 'graphql'
import type { IntrospectionQuery } from 'graphql'
import { readable } from 'svelte/store'

export const schema = readable(
  buildClientSchema(schemaJson as unknown as IntrospectionQuery),
)
