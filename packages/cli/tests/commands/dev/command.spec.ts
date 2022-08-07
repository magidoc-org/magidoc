import { beforeEach, describe, expect, it, vi } from 'vitest'
import runDevelopmentServer from '../../../src/commands/dev/index'
import buildDevCommand from '../../../src/commands/dev/command'
import {
  mockLoadFileConfiguration,
  testMagidocConfiguration,
} from '../configuration'
import { makeTestProgram } from '../program'
import path from 'path'

vi.mock('../../../src/commands/utils/loadConfigFile', () => ({
  loadFileConfiguration: vi.fn(),
}))

vi.mock('../../../src/commands/dev/index', () => ({
  default: vi.fn(),
}))

const program = makeTestProgram()

describe('running the dev command', () => {
  const config = testMagidocConfiguration()

  beforeEach(() => {
    mockLoadFileConfiguration(config)
    buildDevCommand(program)
  })

  describe('with default options', () => {
    it('should run the development server with default options', async () => {
      await program.parseAsync(['dev'], { from: 'user' })
      expect(runDevelopmentServer).toHaveBeenCalledOnce()
      expect(runDevelopmentServer).toHaveBeenCalledWith({
        ...config,
        host: 'localhost',
        magidocConfigLocation: path.resolve('./magidoc.mjs'),
        packageManager: undefined,
        clean: false,
        stacktrace: false,
        port: 3000,
      })
    })
  })

  describe('with custom options', () => {
    it('should run the development server with the custom options', async () => {
      await program.parseAsync(
        [
          'dev',
          '--host',
          '127.0.0.1',
          '--port',
          '4323',
          '--clean',
          '--stacktrace',
          '--package-manager',
          'pnpm',
          '--file',
          './magidoc.second.mjs',
        ],
        { from: 'user' },
      )
      expect(runDevelopmentServer).toHaveBeenCalledOnce()
      expect(runDevelopmentServer).toHaveBeenCalledWith({
        ...config,
        host: '127.0.0.1',
        magidocConfigLocation: path.resolve('./magidoc.second.mjs'),
        packageManager: 'pnpm',
        clean: true,
        stacktrace: true,
        port: 4323,
      })
    })
  })

  describe('with invalid options', () => {
    describe('with a non-existent argument', () => {
      it('should raise an error', async () => {
        await expect(() =>
          program.parseAsync(['dev', '--potato', 'poutine'], { from: 'user' }),
        ).rejects.toThrowError(
          "error: unknown option '--potato'\n(Did you mean --port?)",
        )
      })
    })

    describe('with a wrong type', () => {
      it('should raise an error', async () => {
        await expect(() =>
          program.parseAsync(['dev', '--port', 'abc'], { from: 'user' }),
        ).rejects.toThrowError(
          "error: option '-p|--port <port>' argument 'abc' is invalid. It is not a number",
        )
      })
    })

    describe('too low port', () => {
      it('should raise an error', async () => {
        await expect(() =>
          program.parseAsync(['dev', '--port', '0'], { from: 'user' }),
        ).rejects.toThrowError(
          "error: option '-p|--port <port>' argument '0' is invalid. It should be greater than or equal to 1",
        )
      })
    })

    describe('too high port', () => {
      it('should raise an error', async () => {
        await expect(() =>
          program.parseAsync(['dev', '--port', '423423'], { from: 'user' }),
        ).rejects.toThrowError(
          "error: option '-p|--port <port>' argument '423423' is invalid. It should be less than or equal to 65535",
        )
      })
    })
  })
})
