import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPackageManager } from '../../../src/node/packageManager'
import { selectPackageManagerTask } from '../../../src/tasks/all/selectPackageManager'
import { packageManagerMock, taskWrapperMock } from './utils'

vi.mock('../../../src/node/packageManager')

describe('selecting package manager', () => {
  const ctx = {
    packageManager: packageManagerMock(),
  }

  const bundled = packageManagerMock()

  beforeEach(() => {
    vi.mocked(createPackageManager).mockReturnValueOnce(bundled)
  })

  it('should use the bundled package manager', async () => {
    const task = selectPackageManagerTask()
    await task.executor(ctx, taskWrapperMock())
    expect(ctx.packageManager).toBe(bundled)
    expect(createPackageManager).toHaveBeenCalledOnce()
  })

  it('should output the package manager it uses', async () => {
    const wrapper = taskWrapperMock()
    const task = selectPackageManagerTask()
    await task.executor(ctx, wrapper)
    expect(wrapper.output).toHaveBeenCalledWith('Using the pnpm bundled with Magidoc')
  })
})
