import type { Template } from '../../template'
import fetchTemplate from '../../template/fetch'
import { tmpTemplateFileName } from '../../template/tmp'
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
}

export default async function generate(config: GenerationConfig) {
  const tmpFile = tmpTemplateFileName()

  await fetchTemplate({
    template: config.template,
    version: config.templateVersion,
    destination: tmpFile,
  })

  console.log(`Output zip file to ${tmpFile}`)
}
