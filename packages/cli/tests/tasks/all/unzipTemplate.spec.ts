import { beforeEach, describe, expect, it, vi } from 'vitest'
import { unzipTemplateTask } from '../../../src/tasks/all/unzipTemplate'
import { unzipTemplate } from '../../../src/template/unzip'
import { taskWrapperMock, tmpLocationMock } from './utils'

vi.mock('../../../src/template/unzip')

describe('unzipping template', () => {
  const defaultConfig = {
    website: {
      template: 'carbon-multi-page',
    },
  }

  describe('target website is not a template path', () => {
    const notATemplate = {
      ...defaultConfig,
      website: {
        ...defaultConfig.website,
        template: './not-a-template',
      },
    }

    it('should not enable the task', () => {
      expect(unzipTemplateTask(notATemplate).enabled).toBe(false)
    })
  })

  describe('task is enabled', () => {
    const ctx = {
      tmpDirectory: tmpLocationMock(),
      tmpArchive: tmpLocationMock(),
    }

    describe('template is already unzipped', () => {
      beforeEach(() => {
        ctx.tmpDirectory.exists.mockReturnValueOnce(Promise.resolve(true))
      })

      it('should be enabled', () => {
        expect(unzipTemplateTask(defaultConfig).enabled).toBe(true)
      })

      it('should not unzip the template', async () => {
        await unzipTemplateTask(defaultConfig).executor(ctx, taskWrapperMock())
        expect(unzipTemplate).not.toHaveBeenCalled()
      })
    })

    describe('template is not unzipped yet', () => {
      beforeEach(() => {
        ctx.tmpDirectory.exists.mockReturnValueOnce(Promise.resolve(false))
      })

      it('should be enabled', () => {
        expect(unzipTemplateTask(defaultConfig).enabled).toBe(true)
      })

      it('should unzip the template', async () => {
        await unzipTemplateTask(defaultConfig).executor(ctx, taskWrapperMock())
        expect(unzipTemplate).toHaveBeenCalledOnce()
        expect(unzipTemplate).toHaveBeenCalledWith({
          zipLocation: ctx.tmpArchive.path,
          destination: ctx.tmpDirectory.path,
        })
      })

      it('should cleanup the archive zip', async () => {
        await unzipTemplateTask(defaultConfig).executor(ctx, taskWrapperMock())
        expect(ctx.tmpArchive.delete).toHaveBeenCalledOnce()
      })
    })
  })
})
