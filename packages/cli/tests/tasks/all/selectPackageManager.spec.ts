import { beforeEach, describe, expect, it, vi } from 'vitest'
import { yellow } from '../../../src/commands/utils/outputColors'
import {
  getPackageManager,
  selectPackageManager,
} from '../../../src/node/packageManager'
import { selectPackageManagerTask } from '../../../src/tasks/all/selectPackageManager'
import { packageManagerMock, taskWrapperMock } from './utils'

vi.mock('../../../src/node/packageManager')

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
        vi.mocked(selectPackageManager).mockReturnValueOnce(
          Promise.resolve(availablePackageManager),
        )
      })

      it('should select an available package manager', async () => {
        const task = selectPackageManagerTask(noPackageManager)
        await task.executor(ctx, taskWrapperMock())
        expect(ctx.packageManager).toBe(availablePackageManager)
      })

      it('should output the selected package manager', async () => {
        const wrapper = taskWrapperMock()
        const task = selectPackageManagerTask(noPackageManager)
        await task.executor(ctx, wrapper)
        expect(wrapper.output).toHaveBeenCalledWith(
          `Selected ${availablePackageManager.type}`,
        )
      })
    })

    describe('specifying pnpm as a package manager', () => {
      const packageManager = packageManagerMock()
      const withPackageManager = {
        ...defaultConfig,
        packageManager: 'pnpm' as const,
      }

      beforeEach(() => {
        vi.mocked(getPackageManager).mockReturnValueOnce(packageManager)
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

      it('should output the selected package manager', async () => {
        const wrapper = taskWrapperMock()
        const task = selectPackageManagerTask(withPackageManager)
        await task.executor(ctx, wrapper)
        expect(wrapper.output).toHaveBeenCalledWith(
          `Selected ${packageManager.type}`,
        )
      })
    })

    describe('package manager is not pnpm', () => {
      beforeEach(() => {
        vi.mocked(getPackageManager).mockReturnValueOnce({
          ...packageManagerMock(),
          type: 'yarn',
        })
      })

      it('should output the selected package manager and a warning', async () => {
        const wrapper = taskWrapperMock()
        const task = selectPackageManagerTask({
          ...defaultConfig,
          packageManager: 'yarn' as const,
        })
        await task.executor(ctx, wrapper)
        expect(wrapper.output).toHaveBeenCalledWith(
          `Selected yarn${yellow(
            '\n⚠️ This package manager is not well supported yet.\n⚠️ It is recommended to install pnpm instead.',
          )}`,
        )
      })
    })
  })
})
