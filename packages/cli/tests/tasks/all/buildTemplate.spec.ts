import { build } from 'vite'
import { describe, expect, it, vi } from 'vitest'
import { buildTemplateTask } from '../../../src/tasks/all/buildTemplate'
import {
  packageManagerMock,
  taskWrapperMock,
  tmpLocationMock as tmpLocationMock,
} from './utils'

describe('building template task', () => {
  describe('task is enabled', () => {
    it('should build', () => {
      expect(buildTemplateTask().enabled).toBeUndefined()
    })

    it('should build the project', async () => {
      const task = buildTemplateTask()
      const packageManager = packageManagerMock()
      const tmpDirectory = tmpLocationMock()
      await task.executor(
        {
          packageManager,
          tmpDirectory,
        },
        taskWrapperMock(),
      )
      expect(packageManager.buildProject).toHaveBeenCalledOnce()
      expect(packageManager.buildProject).toHaveBeenCalledWith({
        cwd: tmpDirectory.path,
      })
    })
  })
})
