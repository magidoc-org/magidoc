import {
  Listr,
  ListrContext,
  ListrDefaultRenderer,
  ListrTask,
  ListrTaskWrapper,
} from 'listr2'

export type TaskParams<T> = {
  title: string
  enabled?: boolean
  executor: TaskExecutor<T>
}

export function newTask<T>({
  title,
  enabled,
  executor,
}: TaskParams<T>): Task<T> {
  return {
    title: title,
    enabled: enabled,
    options: {
      persistentOutput: true,
    },
    task: executor,
  }
}

export type TaskExecutor<T> = (
  ctx: T,
  task: ListrTaskWrapper<ListrContext, ListrDefaultRenderer>,
) => Promise<void> | void

export type Task<T> = ListrTask<T, ListrDefaultRenderer>

export type TasksConfig<T> = {
  ctx: T | undefined
  silent: boolean
}

export async function executeAllTasks<T>(
  tasks: Task<T>[],
  config: TasksConfig<T> = {
    ctx: undefined,
    silent: false,
  },
): Promise<T> {
  const listr = new Listr<T>(tasks, {
    exitOnError: true,
    rendererSilent: config.silent,
    rendererOptions: {
      showErrorMessage: false,
      showTimer: true,
      formatOutput: 'wrap',
    },
  })

  return await listr.run(config.ctx)
}
