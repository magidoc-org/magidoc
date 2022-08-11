import { beforeEach, describe, expect, it, vi } from 'vitest'
import eject from '../../../src/commands/eject/index'
import { makeTestProgram } from '../program'
import buildEjectCommand from '../../../src/commands/eject/command'
import path from 'path'

const version = '1.2.3'

vi.mock('../../../src/version', () => ({
  getVersion: () => version,
}))

vi.mock('../../../src/commands/utils/loadConfigFile', () => ({
  loadFileConfiguration: vi.fn(),
}))

vi.mock('../../../src/commands/eject/index', () => ({
  default: vi.fn(),
}))

const program = makeTestProgram()

describe('running the eject command', () => {
  beforeEach(() => {
    buildEjectCommand(program)
  })

  describe('with valid options', () => {
    describe('with default options', () => {
      it('should generate the website', async () => {
        await program.parseAsync(['eject', '--template', 'carbon-multi-page'], {
          from: 'user',
        })
        expect(eject).toHaveBeenCalledOnce()
        expect(eject).toHaveBeenCalledWith({
          packageManager: 'pnpm',
          website: {
            template: 'carbon-multi-page',
            templateVersion: version,
          },
          destination: path.resolve('./template'),
        })
      })
    })

    // describe('with custom options', () => {
    //   it('should run the development server with the custom options', async () => {
    //     await program.parseAsync(
    //       [
    //         'generate',
    //         '--clean',
    //         '--stacktrace',
    //         '--package-manager',
    //         'pnpm',
    //         '--file',
    //         './magidoc.second.mjs',
    //       ],
    //       { from: 'user' },
    //     )
    //     expect(generate).toHaveBeenCalledOnce()
    //     expect(generate).toHaveBeenCalledWith({
    //       ...config,
    //       packageManager: 'pnpm',
    //       clean: true,
    //     })
    //   })
    // })
  })

  describe('with invalid options', () => {
    describe('without the mandatory arguments', () => {
      it('should raise an error', async () => {
        await expect(() =>
          program.parseAsync(['eject'], {
            from: 'user',
          }),
        ).rejects.toThrowError("error: unknown option '--potato'")
      })
    })
  })
})
