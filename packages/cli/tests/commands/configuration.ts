import { vi } from 'vitest'
import type { MagidocConfiguration } from '../../src'
import { loadFileConfiguration } from '../../src/commands/utils/loadConfigFile'

export function mockLoadFileConfiguration(config: MagidocConfiguration | null) {
  const mockObject = vi.mocked(loadFileConfiguration)
  mockObject.mockReset()
  mockObject.mockReturnValueOnce(Promise.resolve(config))
}

export function testMagidocConfiguration(): MagidocConfiguration {
  return {
    introspection: {
      type: 'sdl',
      paths: ['src/**/*.graphql'],
    },
    website: {
      template: 'carbon-multi-page',
      templateVersion: '1.0.0',
      output: './somewhere',
      options: {},
    },
    dev: {
      watch: [],
    },
  }
}
