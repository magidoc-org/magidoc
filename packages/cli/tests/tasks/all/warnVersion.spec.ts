import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import { warnVersionTask } from '../../../src/tasks/all/warnVersion'
import { getVersion } from '../../../src/version'
import { taskWrapperMock } from './utils'

vi.mock('../../../src/version', () => ({
  getVersion: vi.fn(),
}))

describe('installing dependencies', () => {
  const config = {
    website: {
      template: 'carbon-multi-page',
      templateVersion: '1.2.3',
    },
  }

  describe('target template is not a template', () => {
    const notATemplate = {
      website: {
        ...config.website,
        template: './not-a-template',
      },
    }

    it('should not be enabled', () => {
      expect(warnVersionTask(notATemplate).enabled).toBe(false)
    })
  })

  describe('target version is equal to the current CLI version', () => {
    beforeEach(() => {
      ;(getVersion as Mock<[], string>).mockReturnValueOnce(
        config.website.templateVersion,
      )
    })

    it('should not be enabled', () => {
      expect(warnVersionTask(config).enabled).toBe(false)
    })
  })

  describe('task is enabled', () => {
    beforeEach(() => {
      ;(getVersion as Mock<[], string>).mockReturnValueOnce('123.231.123')
    })

    it('should be enabled', () => {
      expect(warnVersionTask(config).enabled).toBe(true)
    })

    it('should warn that the config version is different from the cli version', async () => {
      const wrapper = taskWrapperMock()
      await warnVersionTask(config).executor({}, wrapper)
      expect(wrapper.output).toHaveBeenCalledWith(
        '⚠️ Template version has been set to a different version that the current CLI version.\n⚠️ This may result in unexpected results.',
      )
    })
  })
})
