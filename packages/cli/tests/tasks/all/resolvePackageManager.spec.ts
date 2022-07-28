import { existsSync } from 'fs'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import {
  getPackageManager,
  isPackageManagerAvailable,
  PackageManager,
} from '../../../src/node/packageManager'
import { resolvePackageManagerTask } from '../../../src/tasks/all/resolvePackageManager'

import { packageManagerMock, taskWrapperMock } from './utils'

vi.mock('../../../src/node/packageManager', () => ({
  getPackageManager: vi.fn(),
  isPackageManagerAvailable: vi.fn(),
}))

describe('verifying if target package manager is available', () => {
  describe('task is enabled', () => {
    const config = {
      packageManager: 'pnpm' as const,
    }

    const initialPackageManager = packageManagerMock()
    const ctx = {
      packageManager: initialPackageManager,
    }

    describe('package manager is not available', () => {
      beforeEach(() => {
        ;(
          isPackageManagerAvailable as Mock<[string], Promise<boolean>>
        ).mockReturnValueOnce(Promise.resolve(false))
      })

      it('should raise an error', async () => {
        await expect(() =>
          resolvePackageManagerTask(config).executor(ctx, taskWrapperMock()),
        ).rejects.toThrowError()
      })
    })

    describe('package manager is available', () => {
      const packageManager = packageManagerMock()

      beforeEach(() => {
        ;(
          isPackageManagerAvailable as Mock<[string], Promise<boolean>>
        ).mockReturnValueOnce(Promise.resolve(true))
        ;(
          getPackageManager as Mock<[string], PackageManager>
        ).mockReturnValueOnce(packageManager)
      })

      it('set the target package manager', async () => {
        await resolvePackageManagerTask(config).executor(ctx, taskWrapperMock())
        expect(ctx.packageManager).toBe(packageManager)
      })
    })
  })
})
