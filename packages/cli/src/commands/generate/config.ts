import type { Method } from '@magidoc/rollup-plugin-fetch-gql-schema'
import type { Template } from '../../template'

export type GenerationConfig = {
  /**
   * The target template for generation
   */
  template: Template

  /**
   * The template version to use for generation
   */
  templateVersion: string

  /**
   * The configuration used for fetching the GraphQL Schema from the remote server
   */
  fetchConfig: FetchConfig

  /**
   * The output target directory
   */
  output: string

  /**
   * Wether to clean the existing cache
   */
  clean: boolean

  /**
   * Common and template-specific options
   */
  options: Record<string, string | boolean | number>
}

export type FetchConfig = {
  /**
   * The URL of the target server
   */
  url: string
  /**
   * The HTTP method to to fetch the schema
   */
  method: Method
  /**
   * The headers to pass to the query
   */
  headers: Record<string, string>
}
