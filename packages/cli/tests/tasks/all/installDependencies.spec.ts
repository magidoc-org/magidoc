import { describe, expect, it } from 'vitest'
import { installDependenciesTask } from '../../../src/tasks/all/installDependencies'
import { packageManagerMock, taskWrapperMock, tmpLocationMock } from './utils'

describe('installing dependencies', () => {
  describe('task is enabled', () => {
    const ctx = {
      tmpDirectory: tmpLocationMock(),
      packageManager: packageManagerMock(),
    }

    it('should install the dependencies in the target directory', async () => {
      const task = installDependenciesTask()
      await task.executor(ctx, taskWrapperMock())
      expect(ctx.packageManager.runInstall).toHaveBeenCalledWith({
        cwd: ctx.tmpDirectory.path,
      })
    })
  })
})
