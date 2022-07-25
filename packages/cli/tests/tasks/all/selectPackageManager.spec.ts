import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import {
  getPackageManager,
  selectPackageManager,
} from '../../../src/node/packageManager'
import { selectPackageManagerTask } from '../../../src/tasks/all/selectPackageManager'
import { packageManagerMock, taskWrapperMock } from './utils'

vi.mock('../../../src/node/packageManager', () => ({
  selectPackageManager: vi.fn(),
  getPackageManager: vi.fn(),
}))

describe('selecting package manager', () => {
  const defaultConfig = {
    packageManager: 'pnpm',
  }

  describe('task is enabled', () => {
    const ctx = {
      packageManager: packageManagerMock(),
    }

    describe('no package manager is specified', () => {
      const noPackageManager = {
        ...defaultConfig,
        packageManager: undefined,
      }

      const availablePackageManager = packageManagerMock()

      beforeEach(() => {
        ;(selectPackageManager as Mock).mockReturnValueOnce(
          availablePackageManager,
        )
      })

      it('should select an available package manager', async () => {
        const task = selectPackageManagerTask(noPackageManager)
        await task.executor(ctx, taskWrapperMock())
        expect(ctx.packageManager).toBe(availablePackageManager)
      })
    })

    describe('a package manager is specific', () => {
      const packageManager = packageManagerMock()
      const withPackageManager = {
        ...defaultConfig,
        packageManager: packageManager.type,
      }

      beforeEach(() => {
        ;(getPackageManager as Mock).mockReturnValueOnce(packageManager)
      })

      it('should select an available package manager', async () => {
        const task = selectPackageManagerTask(withPackageManager)
        await task.executor(ctx, taskWrapperMock())
        expect(ctx.packageManager).toBe(packageManager)
        expect(getPackageManager).toHaveBeenCalledOnce()
        expect(getPackageManager).toHaveBeenCalledWith(
          withPackageManager.packageManager,
        )
      })

      it('should output the selected package manager', () => {
        
      })
    })
  })
})
