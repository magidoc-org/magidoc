import type { Variable } from '@magidoc/plugin-starter-variables'
import type {
  ListrContext,
  ListrDefaultRenderer,
  ListrTask,
  ListrTaskWrapper,
} from 'listr2'
import type { NpmRunner } from '../../npm/runner'
import type { TmpLocation } from '../../template/tmp'

export type TaskContext = {
  tmpArchive: TmpLocation
  tmpDirectory: TmpLocation
  npmRunner: NpmRunner
  templateConfiguration: TemplateConfiguration
}

export type TemplateConfiguration = {
  supportedOptions: Variable<unknown>[]
  schemaTargetLocation: string
}

export function newTask({
  title,
  enabled,
  executor,
}: {
  title: string
  enabled?: boolean
  executor: TaskExecutor
}): Task {
  return {
    title: title,
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
