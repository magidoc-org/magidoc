import { Listr } from 'listr2'
import type {
  ListrContext,
  ListrTaskWrapper,
  ListrTask,
  ListrDefaultRenderer,
} from 'listr2'
import type { Template } from '../../template'
import fetchTemplate from '../../template/fetch'
import {
  tmpTemplateArchiveFile,
  tmpTemplateDirectory,
} from '../../template/tmp'
import { unzipTemplate } from '../../template/unzip'
import type { FetchConfig } from './schema/fetch'
import { fetchNpmRunner, NpmRunner } from '../../npm/runner'

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
}

type TaskContext = {
  npmRunner: NpmRunner
}

export default async function generate(config: GenerationConfig) {
  const templateLocationName = `${config.template}@${config.templateVersion}`
  const tmpArchive = tmpTemplateArchiveFile(templateLocationName)
  const tmpDirectory = tmpTemplateDirectory(templateLocationName)

  const listr = new Listr<TaskContext>(
    [
      newTask({
        title: 'Clean',
        enabled: config.clean,
        executor: async () => {
          await tmpArchive.delete()
          await tmpDirectory.delete()
        },
      }),
      newTask({
        title: 'Select NPM runner',
        executor: async (ctx: TaskContext, task) => {
          ctx.npmRunner = await fetchNpmRunner()
          task.output = `Selected ${ctx.npmRunner.type}`
        },
      }),
      newTask({
        title: `Fetch template ${config.template}@${config.templateVersion}`,
        skip: async () => {
          if (await tmpArchive.exists()) {
            return 'Template already downloaded'
          }

          return false
        },
        executor: async () => {
          await fetchTemplate({
            template: config.template,
            version: config.templateVersion,
            destination: tmpArchive.path,
          })
        },
      }),
      newTask({
        title: `Unzip template`,
        skip: async () => {
          if (await tmpDirectory.exists()) {
            return 'Template already unzipped'
          }

          return false
        },
        executor: async () => {
          await unzipTemplate({
            zipLocation: tmpArchive.path,
            destination: tmpDirectory.path,
          })
        },
      }),
      newTask({
        title: `Install dependencies`,
        executor: async (ctx: TaskContext) => {
          await ctx.npmRunner.runInstall({
            cwd: tmpDirectory.path,
          })
        },
      }),
      newTask({
        title: `Build template`,
        executor: async (ctx: TaskContext) => {
          await ctx.npmRunner.buildProject({
            cwd: tmpDirectory.path,
          })
        },
      }),
    ],
    {
      exitOnError: true,
      rendererOptions: {
        showTimer: true,
      },
    },
  )

  await listr.run()
}

function newTask({
  title,
  skip,
  enabled,
  executor,
}: {
  title: string
  skip?: () => Promise<string | false>
  enabled?: boolean
  executor: (
    ctx: ListrContext,
    task: ListrTaskWrapper<ListrContext, ListrDefaultRenderer>,
  ) => Promise<void> | void
}): ListrTask<TaskContext, ListrDefaultRenderer> {
  return {
    title: title,
    skip: skip,
    enabled: enabled,
    options: {
      persistentOutput: true,
    },
    task: executor,
  }
}
