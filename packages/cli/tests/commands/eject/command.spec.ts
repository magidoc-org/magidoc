import { beforeEach, describe, expect, it, vi } from 'vitest'
import eject from '../../../src/commands/eject/index'
import { makeTestProgram } from '../program'
import buildEjectCommand from '../../../src/commands/eject/command'
import path from 'path'
import type { Command } from 'commander'

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

let program: Command

describe('running the eject command', () => {
  beforeEach(() => {
    program = makeTestProgram()
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

    describe('with custom options', () => {
      it('should run the development server with the custom options', async () => {
        await program.parseAsync(
          [
            'eject',
            '--template',
            'carbon-multi-page',
            '--template-version',
            '5.6.7',
            '--destination',
            './custom-destination',
            '--package-manager',
            'pnpm',
            '--stacktrace',
          ],
          { from: 'user' },
        )
        expect(eject).toHaveBeenCalledOnce()
        expect(eject).toHaveBeenCalledWith({
          packageManager: 'pnpm',
          destination: path.resolve('./custom-destination'),
          website: {
            template: 'carbon-multi-page',
            templateVersion: '5.6.7',
          },
        })
      })
    })
  })

  describe('with invalid options', () => {
    describe('without the mandatory arguments', () => {
      it('should raise an error', async () => {
        await expect(() =>
          program.parseAsync(['eject'], {
            from: 'user',
          }),
        ).rejects.toThrowError(
          "error: required option '-t|--template <template>' not specified",
        )
      })
    })
  })
})
