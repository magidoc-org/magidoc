import { describe, expect, it, vi } from 'vitest'
import { moveOutputTask } from '../../../src/tasks/all/moveOutput'
import { moveOutputBuild } from '../../../src/template/output'
import { taskWrapperMock, tmpLocationMock } from './utils'

vi.mock('../../../src/template/output', () => ({
  moveOutputBuild: vi.fn(),
}))

describe('move output', () => {
  const defaultConfig = {
    website: {
      template: 'carbon-multi-page',
      templateVersion: '2.4.0',
      output: 'whatever',
      options: {},
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
