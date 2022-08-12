import { describe, expect, it, vi } from 'vitest'
import { moveOutputTask } from '../../../src/tasks/all/moveOutput'
import { moveOutputBuild } from '../../../src/template/output'
import { taskWrapperMock, tmpLocationMock } from './utils'

vi.mock('../../../src/template/output')

describe('move output', () => {
  const defaultConfig = {
    website: {
      output: 'whatever',
    },
  }

  describe('task is enabled', () => {
    const ctx = {
      tmpDirectory: tmpLocationMock(),
    }

    it('should move the temporary directory to the target output location', async () => {
      const task = moveOutputTask(defaultConfig)
      await task.executor(ctx, taskWrapperMock())
      expect(moveOutputBuild).toHaveBeenCalledWith(
        ctx.tmpDirectory.path + '/build',
        defaultConfig.website.output,
      )
    })
  })
})
