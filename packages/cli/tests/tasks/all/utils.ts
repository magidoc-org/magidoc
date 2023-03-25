import _ from 'lodash'
import { type Mock, vi } from 'vitest'
import {
  type PackageManagerType,
  PACKAGE_MANAGER_TYPES,
} from '../../../src/node/packageManager'

export function taskWrapperMock(): {
  skip: Mock<[string], void>
  output: Mock<[string], void>
} {
  return {
    skip: vi.fn(),
    output: vi.fn(),
  }
}

export function packageManagerMock(): {
  type: PackageManagerType
  buildProject: Mock<[], Promise<void>>
  runInstall: Mock<[], Promise<void>>
  startDevServer: Mock<[], Promise<void>>
} {
  return {
    type: _.sample(PACKAGE_MANAGER_TYPES) ?? 'pnpm',
    buildProject: vi.fn(),
    runInstall: vi.fn(),
    startDevServer: vi.fn(),
  }
}

export function tmpLocationMock(): {
  path: string
  exists: Mock<[], Promise<boolean>>
  delete: Mock<[], Promise<void>>
} {
  return {
    path: Math.random().toString(36).substring(2, 7),
    exists: vi.fn(),
    delete: vi.fn(),
  }
}
