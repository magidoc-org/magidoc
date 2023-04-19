import { Listr, PRESET_TIMER } from 'listr2'

export type Task<T> = {
  title: string
  enabled?: boolean
  executor: TaskExecutor<T>
}

export type TaskWrapper = {
  skip: (message: string) => void
  output: (message: string) => void
}

export type TaskExecutor<T> = (
  ctx: T,
  task: TaskWrapper,
) => Promise<void> | void

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
  const listr = new Listr<T>(
    tasks.map((task) => ({
      title: task.title,
      enabled: task.enabled,
      options: {
        persistentOutput: true,
      },
      task: (ctx, wrapper) =>
        task.executor(ctx, {
          output: (message) => (wrapper.output = message),
          skip: (message) => wrapper.skip(message),
        }),
    })),
    {
      exitOnError: true,
      silentRendererCondition: config.silent,
      rendererOptions: {
        showErrorMessage: false,
        formatOutput: 'wrap',
        timer: PRESET_TIMER,
      },
    },
  )

  return await listr.run(config.ctx)
}
