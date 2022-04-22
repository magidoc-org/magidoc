import { newTask, GenerateTask } from '../task'
import { selectNpmRunner } from '../../../npm/runner'

export function selectNpmRunnerTask(): GenerateTask {
  return newTask({
    title: 'Select NPM runner',
    executor: async (ctx, task) => {
      ctx.npmRunner = await selectNpmRunner()
      task.output = `Selected ${ctx.npmRunner.type}`
    },
  })
}
