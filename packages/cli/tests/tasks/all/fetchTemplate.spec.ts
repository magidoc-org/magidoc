import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchTemplateTask } from '../../../src/tasks/all/fetchTemplate'
import fetchTemplate from '../../../src/template/fetch'
import { taskWrapperMock, tmpLocationMock } from './utils'

vi.mock('../.././../src/template/fetch')

describe('fetch template', () => {
  const defaultConfig = {
    website: {
      template: 'carbon-multi-page',
      templateVersion: '2.4.0',
      output: 'whatever',
      options: {},
    },
  }

  describe('target template is not a template', () => {
    const notTemplate = {
      ...defaultConfig,
      website: {
        ...defaultConfig.website,
        template: './some-path',
      },
    }

    it('should not enable task', () => {
      expect(fetchTemplateTask(notTemplate).enabled).toBe(false)
    })
  })

  describe('task is enabled', () => {
    const ctx = {
      tmpArchive: tmpLocationMock(),
      tmpDirectory: tmpLocationMock(),
    }

    describe('temporary archive already exists', () => {
      beforeEach(() => {
        ctx.tmpArchive.exists.mockReturnValueOnce(Promise.resolve(true))
      })

      it('should not fetch template', async () => {
        const task = fetchTemplateTask(defaultConfig)
        await task.executor(ctx, taskWrapperMock())
        expect(fetchTemplate).not.toHaveBeenCalled()
      })

      it('should skip the task', async () => {
        const wrapper = taskWrapperMock()
        const task = fetchTemplateTask(defaultConfig)
        await task.executor(ctx, wrapper)
        expect(wrapper.skip).toHaveBeenCalledWith(
          'Template already downloaded.',
        )
      })
    })

    describe('temporary directory already exists', () => {
      beforeEach(() => {
        ctx.tmpDirectory.exists.mockReturnValueOnce(Promise.resolve(true))
      })

      it('should not fetch template', async () => {
        const task = fetchTemplateTask(defaultConfig)
        await task.executor(ctx, taskWrapperMock())
        expect(fetchTemplate).not.toHaveBeenCalled()
      })
      it('should skip the task', async () => {
        const wrapper = taskWrapperMock()
        const task = fetchTemplateTask(defaultConfig)
        await task.executor(ctx, wrapper)
        expect(wrapper.skip).toHaveBeenCalledWith('Template already unzipped.')
      })
    })

    describe('both directories exist', () => {
      beforeEach(() => {
        ctx.tmpArchive.exists.mockReturnValueOnce(Promise.resolve(false))
        ctx.tmpDirectory.exists.mockReturnValueOnce(Promise.resolve(false))
      })

      it('should fetch template', async () => {
        const task = fetchTemplateTask(defaultConfig)
        await task.executor(ctx, taskWrapperMock())
        expect(fetchTemplate).toHaveBeenCalledWith({
          destination: ctx.tmpArchive.path,
          template: defaultConfig.website.template,
          version: defaultConfig.website.templateVersion,
        })
      })
    })
  })
})
