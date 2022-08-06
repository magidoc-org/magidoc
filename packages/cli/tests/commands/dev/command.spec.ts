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

  //   describe('with a custom options', () => {})

  //   describe('with invalid options', () => {})
})
