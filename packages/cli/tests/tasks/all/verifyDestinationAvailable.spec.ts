import { existsSync } from 'fs'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { verifyDestinationAvailableTask } from '../../../src/tasks/all/verifyDestinationAvailable'
import { taskWrapperMock } from './utils'

vi.mock('fs')

describe('verifying destination folder is available', () => {
  describe('task is enabled', () => {
    const ctx = {
      destination: 'destination',
    }

    describe('destination already exists', () => {
      beforeEach(() => {
        vi.mocked(existsSync).mockReturnValueOnce(true)
      })

      it('should raise an error', () => {
        expect(() =>
          verifyDestinationAvailableTask(ctx).executor({}, taskWrapperMock()),
        ).toThrowError()
      })
    })

    describe('destination does not exist', () => {
      beforeEach(() => {
        vi.mocked(existsSync).mockReturnValueOnce(false)
      })

      it('should not raise an error', () => {
        expect(() =>
          verifyDestinationAvailableTask(ctx).executor({}, taskWrapperMock()),
        ).not.toThrowError()
      })
    })
  })
})
