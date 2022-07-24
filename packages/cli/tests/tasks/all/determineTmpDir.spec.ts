import { describe, expect, it } from 'vitest'
import { determineTmpDirectoryTask } from '../../../src/tasks/all/determineTmpDir'
import { taskWrapperMock, tmpLocationMock } from './utils'

describe('determine tmp directory task', () => {
  const defaultConfig = {
    tmpArchive: tmpLocationMock(),
    tmpDirectory: tmpLocationMock(),
    website: {
      template: 'carbon-multi-page',
      templateVersion: '2.4.0',
    },
  }

  describe('website is a template', () => {
    describe('config contains target paths for both directories', () => {
      it('should be enabled', () => {
        expect(determineTmpDirectoryTask(defaultConfig).enabled).toBeUndefined()
      })

      it('should use the provided paths', () => {
        const ctx = {
          tmpArchive: tmpLocationMock(),
          tmpDirectory: tmpLocationMock(),
        }

        expect(
          determineTmpDirectoryTask(defaultConfig).executor(
            ctx,
            taskWrapperMock(),
          ),
        )

        expect(ctx.tmpArchive).toBe(defaultConfig.tmpArchive)
        expect(ctx.tmpDirectory).toBe(defaultConfig.tmpDirectory)
      })
    })

    describe('config does not contains target paths', () => {
      const noTargetPaths = {
        ...defaultConfig,
        tmpArchive: undefined,
        tmpDirectory: undefined,
      }

      it('should be enabled', () => {
        expect(determineTmpDirectoryTask(noTargetPaths).enabled).toBeUndefined()
      })

      it('should generate new target paths', () => {
        const initialArchive = tmpLocationMock()
        const initialDirectory = tmpLocationMock()
        const ctx = {
          tmpArchive: initialArchive,
          tmpDirectory: initialDirectory,
        }

        expect(
          determineTmpDirectoryTask(noTargetPaths).executor(
            ctx,
            taskWrapperMock(),
          ),
        )

        expect(ctx.tmpArchive).not.toBe(initialArchive)
        expect(ctx.tmpArchive).not.toBeUndefined()
        expect(ctx.tmpArchive.path).toContain(
          `${defaultConfig.website.template}@${defaultConfig.website.templateVersion}`,
        )
        expect(ctx.tmpDirectory).not.toBe(initialDirectory)
        expect(ctx.tmpDirectory).not.toBeUndefined()
        expect(ctx.tmpDirectory.path).toContain(
          `${defaultConfig.website.template}@${defaultConfig.website.templateVersion}`,
        )
      })
    })
  })

  describe('website is not a template', () => {
    const notTemplateConfig = {
      ...defaultConfig,
      website: {
        ...defaultConfig.website,
        template: '/a/template/path',
      },
    }

    it('should be enabled', () => {
      expect(
        determineTmpDirectoryTask(notTemplateConfig).enabled,
      ).toBeUndefined()
    })

    it('should provide a temporary directory to the template path', () => {
      const initialArchive = tmpLocationMock()
      const ctx = {
        tmpArchive: initialArchive,
        tmpDirectory: tmpLocationMock(),
      }

      expect(
        determineTmpDirectoryTask(notTemplateConfig).executor(
          ctx,
          taskWrapperMock(),
        ),
      )

      expect(ctx.tmpArchive).toBe(initialArchive)
      expect(ctx.tmpDirectory.path).toBe(notTemplateConfig.website.template)
    })
  })
})
