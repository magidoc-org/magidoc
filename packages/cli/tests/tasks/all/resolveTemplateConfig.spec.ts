import { templates, type Variable } from '@magidoc/plugin-starter-variables'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { resolveTemplateConfigurationTask } from '../../../src/tasks/all/resolveTemplateConfig'
import {
  loadTemplateConfig,
  type RawMagidocTemplateConfig,
} from '../../../src/template/config'
import { taskWrapperMock, tmpLocationMock } from './utils'
import path from 'path'

vi.mock('../../../src/template/config')

describe('resolving template config', () => {
  const ctx = {
    tmpDirectory: tmpLocationMock(),
    templateConfiguration: {
      supportedOptions: [],
      schemaTargetLocation: '',
      staticAssetsLocation: '',
      envFileLocation: '',
    },
  }

  const templateConfig: RawMagidocTemplateConfig = {
    STATIC_ASSETS_LOCATION: './static',
    ENV_FILE_LOCATION: './src/_variables.json',
    SCHEMA_TARGET_LOCATION: './src/_schema.graphqls',
    SUPPORTED_OPTIONS: [
      templates.APP_FAVICON,
      templates.PAGES,
    ] as ReadonlyArray<Variable<unknown>>,
  }

  beforeEach(() => {
    vi.mocked(loadTemplateConfig).mockReturnValueOnce(
      Promise.resolve(templateConfig),
    )
  })

  describe('task is enabled', () => {
    it('should set the output', async () => {
      const wrapper = taskWrapperMock()
      const task = resolveTemplateConfigurationTask()
      await task.executor(ctx, wrapper)
      expect(wrapper.output).toHaveBeenCalledOnce()
      expect(wrapper.output).toHaveBeenCalledWith(
        'Found 2 supported keys\nTarget schema location: ./src/_schema.graphqls',
      )
    })

    it('should set the resolved template configuration properly', async () => {
      const task = resolveTemplateConfigurationTask()
      await task.executor(ctx, taskWrapperMock())

      expect(ctx.templateConfiguration).toEqual({
        supportedOptions: templateConfig.SUPPORTED_OPTIONS,
        schemaTargetLocation: path.join(
          ctx.tmpDirectory.path,
          templateConfig.SCHEMA_TARGET_LOCATION,
        ),
        staticAssetsLocation: path.join(
          ctx.tmpDirectory.path,
          templateConfig.STATIC_ASSETS_LOCATION,
        ),
        envFileLocation: path.join(
          ctx.tmpDirectory.path,
          templateConfig.ENV_FILE_LOCATION,
        ),
      })
    })
  })
})
