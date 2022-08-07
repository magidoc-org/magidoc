import { beforeEach, describe, expect, it, vi } from 'vitest'
import generate from '../../../src/commands/generate/index'
import {
  mockLoadFileConfiguration,
  testMagidocConfiguration,
} from '../configuration'
import { makeTestProgram } from '../program'
import path from 'path'
import buildGenerateCommand from '../../../src/commands/generate/command'

vi.mock('../../../src/commands/utils/loadConfigFile', () => ({
  loadFileConfiguration: vi.fn(),
}))

vi.mock('../../../src/commands/generate/index', () => ({
  default: vi.fn(),
}))

const program = makeTestProgram()

describe('running the generate command', () => {
  const config = testMagidocConfiguration()

  beforeEach(() => {
    buildGenerateCommand(program)
  })

  describe('loading the configuration fails', () => {
    beforeEach(() => {
      mockLoadFileConfiguration(null)
    })

    it('should not generate the template', async () => {
      await program.parseAsync(['generate'], { from: 'user' })
      expect(generate).not.toHaveBeenCalled()
    })

    it('should set the process exit code', async () => {
      await program.parseAsync(['generate'], { from: 'user' })
      expect(process.exitCode).toBe(1)
    })
  })

  describe('loading the default configuration succeeds', () => {
    beforeEach(() => {
      mockLoadFileConfiguration(config)
    })
    describe('with default options', () => {
      it('should generate the website', async () => {
        await program.parseAsync(['generate'], { from: 'user' })
        expect(generate).toHaveBeenCalledOnce()
        expect(generate).toHaveBeenCalledWith({
          ...config,
          packageManager: undefined,
          clean: false,
        })
      })
    })

    describe('with custom options', () => {
      it('should run the development server with the custom options', async () => {
        await program.parseAsync(
          [
            'generate',
            '--clean',
            '--stacktrace',
            '--package-manager',
            'pnpm',
            '--file',
            './magidoc.second.mjs',
          ],
          { from: 'user' },
        )
        expect(generate).toHaveBeenCalledOnce()
        expect(generate).toHaveBeenCalledWith({
          ...config,
          packageManager: 'pnpm',
          clean: true,
        })
      })
    })
  })

  describe('with invalid options', () => {
    describe('with a non-existent argument', () => {
      it('should raise an error', async () => {
        await expect(() =>
          program.parseAsync(['generate', '--potato', 'poutine'], {
            from: 'user',
          }),
        ).rejects.toThrowError("error: unknown option '--potato'")
      })
    })
  })
})
