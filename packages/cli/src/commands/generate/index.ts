import { Listr, ListrGetRendererClassFromValue } from 'listr2'
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
}

type TaskContext = {
  npmRunner: NpmRunner
}

export default async function generate(config: GenerationConfig) {
  const tmpArchive = tmpTemplateArchiveFile()
  const tmpDirectory = tmpTemplateDirectory()

  const listr = new Listr<TaskContext>(
    [
      newTask({
        title: 'Select NPM runner',
        executor: (ctx: TaskContext, task) => {
          ctx.npmRunner = fetchNpmRunner()
          task.output = `Selected ${ctx.npmRunner.type}`
        },
      }),
      newTask({
        title: `Fetching template ${config.template}@${config.templateVersion}`,
        executor: async () => {
          await fetchTemplate({
            template: config.template,
            version: config.templateVersion,
            destination: tmpArchive.path,
          })
        },
      }),
      newTask({
        title: `Unzipping template`,
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
          await ctx.npmRunner.runInstall(tmpDirectory.path)
        },
      }),
    ],
    {
      exitOnError: true,
    },
  )

  await listr.run()
}

function newTask({
  title,
  executor,
}: {
  title: string
  executor: (
    ctx: ListrContext,
    task: ListrTaskWrapper<ListrContext, ListrDefaultRenderer>,
  ) => Promise<void> | void
}): ListrTask<
  ListrContext,
  ListrGetRendererClassFromValue<ListrDefaultRenderer>
> {
  return {
    title: title,
    options: {
      showTimer: true,
      persistentOutput: true,
    },
    task: executor,
  }
}
