import type { Template } from '../../template'
import fetchTemplate from '../../template/fetch'
import {
  tmpTemplateArchiveFile,
  tmpTemplateDirectory,
} from '../../template/tmp'
import { unzipTemplate } from '../../template/unzip'
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
  const tmpArchive = tmpTemplateArchiveFile()
  const tmpDirectory = tmpTemplateDirectory()

  await fetchTemplate({
    template: config.template,
    version: config.templateVersion,
    destination: tmpArchive.path,
  })

  console.log(`Output zip file to ${tmpArchive.path}`)

  await unzipTemplate({
    zipLocation: tmpArchive.path,
    destination: tmpDirectory.path,
  })
  
  console.log(`Unzipped directory to ${tmpDirectory.path}`)
}
