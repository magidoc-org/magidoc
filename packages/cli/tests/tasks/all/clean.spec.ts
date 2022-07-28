import { describe, expect, it } from 'vitest'
import { cleanTask } from '../../../src/tasks/all/clean'
import { taskWrapperMock, tmpLocationMock } from './utils'

describe('clean task', () => {
  const defaultConfig = {
    clean: true,
    website: {
      template: 'carbon-multi-page',
    },
  }

  describe('cleaning is disabled', () => {
    it('should not clean', () => {
      expect(
        cleanTask({
          ...defaultConfig,
          clean: false,
        }).enabled,
      ).toBe(false)
    })
  })

  describe('template is not one of the magidoc template', () => {
    it('should not clean', () => {
      expect(
        cleanTask({
          ...defaultConfig,
          website: {
            ...defaultConfig.website,
            template: 'whatever',
          },
        }).enabled,
      ).toBe(false)
    })
  })

  describe('task is enabled', () => {
    const ctx = {
      tmpArchive: tmpLocationMock(),
      tmpDirectory: tmpLocationMock(),
    }

    it('should clean', () => {
      expect(cleanTask(defaultConfig).enabled).toBe(true)
    })

    it('should delete the archive file', async () => {
      const task = cleanTask(defaultConfig)
      await task.executor(ctx, taskWrapperMock())
      expect(ctx.tmpArchive.delete).toHaveBeenCalledOnce()
    })

    it('should delete the output directory', async () => {
      const task = cleanTask(defaultConfig)
      await task.executor(ctx, taskWrapperMock())
      expect(ctx.tmpDirectory.delete).toHaveBeenCalledOnce()
    })
  })
})
