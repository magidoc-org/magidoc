import { exec } from 'child_process'
import { vi, it, expect, describe, beforeEach } from 'vitest'
import { executeAllTasks, type Task } from '../../src/tasks/runner'

type Ctx = {
  randomStringBeingSet: string
}

describe('task runner', () => {
  describe('given a task is disabled', () => {
    const task = {
      title: 'Disabled task',
      enabled: false,
      executor: vi.fn(),
    }

    it('should not execute the task', async () => {
      await executeAllTasks<Ctx>([task])
      expect(task.executor).not.toHaveBeenCalled()
    })

    it('should return an empty result', async () => {
      const result = await executeAllTasks<Ctx>([task])
      expect(result).toEqual({})
    })
  })

  describe('given a task is skipped', () => {
    const stringValue = 'potato'

    const task: Task<Ctx> = {
      title: 'Skipped task',
      executor: (ctx, wrapper) => {
        ctx.randomStringBeingSet = stringValue
        return wrapper.skip('Skipped task')
      },
    }

    it('should still keep context modifications', async () => {
      const result = await executeAllTasks([task])
      expect(result).toEqual({ randomStringBeingSet: stringValue })
    })
  })

  describe('given a task output is changed', () => {
    const stringValue = 'potato'

    const task: Task<Ctx> = {
      title: 'Output changed task',
      executor: (ctx, wrapper) => {
        wrapper.output('Here comes the sun')
        wrapper.output('Again')
        ctx.randomStringBeingSet = stringValue
      },
    }

    it('should keep context modifications', async () => {
      const result = await executeAllTasks([task])
      expect(result).toEqual({ randomStringBeingSet: stringValue })
    })
  })

  describe('given a task ends in error', () => {
    const tasks = [
      {
        title: 'First task',
        executor: vi.fn(),
      },
      {
        title: 'Second task',
        executor: vi.fn(),
      },
    ]

    const error = new Error('Something went wrong')

    beforeEach(() => {
      tasks[0].executor.mockRejectedValueOnce(error)
    })

    it('should raise an error', async () => {
      await expect(executeAllTasks(tasks)).rejects.toThrow(error)
    })

    it('should not execute further tasks', async () => {
      try {
        await executeAllTasks(tasks)
      } catch {}

      expect(tasks[1].executor).not.toHaveBeenCalled()
    })
  })

  describe('given a series of successful tasks', () => {
    const firstStringValue = 'potato'
    const secondStringValue = 'mashed'

    const tasks: Task<Ctx>[] = [
      {
        title: 'First task',
        executor: (ctx) => {
          ctx.randomStringBeingSet = firstStringValue
        },
      },
      {
        title: 'Second task',
        executor: (ctx) => {
          ctx.randomStringBeingSet = secondStringValue
        },
      },
    ]

    it('should return the last modified version of the context', async () => {
      const result = await executeAllTasks(tasks)
      expect(result).toEqual({ randomStringBeingSet: secondStringValue })
    })
  })
})
