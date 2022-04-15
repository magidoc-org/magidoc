import { Listr } from 'listr2'
import type {
  ListrContext,
  ListrTaskWrapper,
  ListrTask,
  ListrDefaultRenderer,
} from 'listr2'
import type { Template } from '../../template'
import type { FetchConfig } from './schema/fetch'
import { clean as cleanTask } from './tasks/clean'
import { determineTmpDirectoryTask } from './tasks/determineTmpDir'
import { selectNpmRunnerTask } from './tasks/selectNpmRunner'
import { fetchTemplateTask } from './tasks/fetchTemplate'
import { unzipTemplateTask } from './tasks/unzipTemplate'
import { installDependenciesTask } from './tasks/installDependencies'
import { buildTemplateTask } from './tasks/buildTemplate'
import { moveOutputTask } from './tasks/moveOutput'
import type { TmpLocation } from '../../template/tmp'
import type { NpmRunner } from '../../npm/runner'

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

export type TaskContext = {
  tmpArchive: TmpLocation
  tmpDirectory: TmpLocation
  npmRunner: NpmRunner
}

export default async function generate(config: GenerationConfig) {
  const listr = new Listr<TaskContext>(
    [
      determineTmpDirectoryTask(config),
      cleanTask(config),
      selectNpmRunnerTask(),
      fetchTemplateTask(config),
      unzipTemplateTask(),
      installDependenciesTask(),
      buildTemplateTask(),
      moveOutputTask(config),
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

export function newTask({
  title,
  skip,
  enabled,
  executor,
}: {
  title: string
  skip?: (ctx: TaskContext) => Promise<string | false>
  enabled?: boolean
  executor: TaskExecutor
}): Task {
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

export type TaskExecutor = (
  ctx: TaskContext,
  task: ListrTaskWrapper<ListrContext, ListrDefaultRenderer>,
) => Promise<void> | void

export type Task = ListrTask<TaskContext, ListrDefaultRenderer>
