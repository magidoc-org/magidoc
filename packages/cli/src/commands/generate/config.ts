import type { Template } from '../../template'
import type { FetchConfig } from './schema/fetch'

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
  fetchConfig?: FetchConfig

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
