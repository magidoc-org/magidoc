import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  getPackageManager,
  isPackageManagerAvailable,
} from '../../../src/node/packageManager'
import { resolvePackageManagerTask } from '../../../src/tasks/all/resolvePackageManager'

import { packageManagerMock, taskWrapperMock } from './utils'

vi.mock('../../../src/node/packageManager')

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
        vi.mocked(isPackageManagerAvailable).mockReturnValueOnce(
          Promise.resolve(false),
        )
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
        vi.mocked(isPackageManagerAvailable).mockReturnValueOnce(
          Promise.resolve(true),
        )
        vi.mocked(getPackageManager).mockReturnValueOnce(packageManager)
      })

      it('set the target package manager', async () => {
        await resolvePackageManagerTask(config).executor(ctx, taskWrapperMock())
        expect(ctx.packageManager).toBe(packageManager)
      })
    })
  })
})
