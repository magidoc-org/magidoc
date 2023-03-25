import {
  toVariablesFile,
  type Variable,
} from '@magidoc/plugin-starter-variables'
import templates from '@magidoc/plugin-starter-variables/build/variables/templates'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { writeFile } from 'fs/promises'
import { taskWrapperMock } from './utils'
import { writeEnvFileTask } from '../../../src/tasks/all/writeEnvFile'

const variable = templates.APP_FAVICON

vi.mock('fs/promises')
vi.mock('@magidoc/plugin-starter-variables')

describe('writing environment file', () => {
  describe('task is enabled', () => {
    const config = {
      website: {
        options: {
          title: 'Magidoc',
          description: 'Magidoc',
        },
      },
    }

    const ctx = {
      templateConfiguration: {
        envFileLocation: './potato.json',
        supportedOptions: [variable as Variable<unknown>],
      },
    }

    const serializedVariables = '{"MAGIDOC_GENERATE":true}'

    beforeEach(() => {
      vi.mocked(toVariablesFile).mockReturnValue(serializedVariables)
    })

    it('write the variables to the target file', async () => {
      const task = writeEnvFileTask(config)
      await task.executor(ctx, taskWrapperMock())
      expect(writeFile).toHaveBeenCalledWith(
        ctx.templateConfiguration.envFileLocation,
        serializedVariables,
      )
      expect(toVariablesFile).toHaveBeenCalledWith(
        config.website.options,
        ctx.templateConfiguration.supportedOptions,
      )
    })
  })
})
