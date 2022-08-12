import { beforeEach, describe, expect, it, vi } from 'vitest'
import preview from '../../../src/commands/preview'
import {
  mockLoadFileConfiguration,
  testMagidocConfiguration,
} from '../configuration'
import { makeTestProgram } from '../program'
import path from 'path'
import type { Command } from 'commander'
import buildPreviewCommand from '../../../src/commands/preview/command'
import type { MagidocConfiguration } from '../../../src'

vi.mock('../../../src/commands/utils/loadConfigFile')
vi.mock('../../../src/commands/preview')

let program: Command

describe('running the preview command', () => {
  const config = testMagidocConfiguration()

  beforeEach(() => {
    program = makeTestProgram()
    buildPreviewCommand(program)
  })

  describe('loading the configuration fails', () => {
    beforeEach(() => {
      mockLoadFileConfiguration(null)
    })

    it('should not preview the website', async () => {
      await program.parseAsync(['preview'], { from: 'user' })
      expect(preview).not.toHaveBeenCalled()
    })

    it('should set the process exit code', async () => {
      await program.parseAsync(['preview'], { from: 'user' })
      expect(process.exitCode).toBe(1)
    })
  })

  describe('loading the configuration succeeds', () => {
    beforeEach(() => {
      mockLoadFileConfiguration(config)
    })

    describe('with default options', () => {
      it('should preview the output build', async () => {
        await program.parseAsync(['preview'], { from: 'user' })
        expect(preview).toHaveBeenCalledOnce()
        expect(preview).toHaveBeenCalledWith({
          websiteLocation: path.resolve(config.website.output),
          port: 4000,
        })
      })
    })

    describe('with custom options', () => {
      it('should run the preview server with the custom options', async () => {
        await program.parseAsync(
          [
            'preview',
            '--port',
            '54345',
            '--stacktrace',
            '--file',
            './magidoc.second.mjs',
          ],
          { from: 'user' },
        )
        expect(preview).toHaveBeenCalledOnce()
        expect(preview).toHaveBeenCalledWith({
          websiteLocation: path.resolve(config.website.output),
          port: 54345,
        })
      })
    })

    describe('with a site root option', () => {
      const configWithSiteRoot: MagidocConfiguration = {
        ...config,
        website: {
          ...config.website,
          options: {
            siteRoot: '/docs',
          },
        },
      }

      beforeEach(() => {
        mockLoadFileConfiguration(configWithSiteRoot)
      })

      it('should run the preview server with the custom options', async () => {
        await program.parseAsync(['preview'], { from: 'user' })
        expect(preview).toHaveBeenCalledOnce()
        expect(preview).toHaveBeenCalledWith({
          websiteLocation: path.resolve(config.website.output),
          port: 4000,
          siteRoot: '/docs',
        })
      })
    })
  })
})
