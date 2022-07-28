import { existsSync } from 'fs'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import { verifyDestinationAvailableTask } from '../../../src/tasks/all/verifyDestinationAvailable'
import { taskWrapperMock } from './utils'

vi.mock('fs', () => ({
  existsSync: vi.fn(),
}))

describe('verifying destination folder is available', () => {
  describe('task is enabled', () => {
    const ctx = {
      destination: 'destination',
    }

    describe('destination already exists', () => {
      beforeEach(() => {
        ;(existsSync as Mock<[string], boolean>).mockReturnValueOnce(true)
      })

      it('should raise an error', () => {
        expect(() =>
          verifyDestinationAvailableTask(ctx).executor({}, taskWrapperMock()),
        ).toThrowError()
      })
    })

    describe('destination does not exist', () => {
      beforeEach(() => {
        ;(existsSync as Mock<[string], boolean>).mockReturnValueOnce(false)
      })

      it('should not raise an error', () => {
        expect(() =>
          verifyDestinationAvailableTask(ctx).executor({}, taskWrapperMock()),
        ).not.toThrowError()
      })
    })
  })
})
