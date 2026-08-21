import { type Mock, vi } from 'vitest'

export function taskWrapperMock(): {
  skip: Mock
  output: Mock
} {
  return {
    skip: vi.fn(),
    output: vi.fn(),
  }
}

export function packageManagerMock(): {
  buildProject: Mock
  runInstall: Mock
  startDevServer: Mock
} {
  return {
    buildProject: vi.fn(),
    runInstall: vi.fn(),
    startDevServer: vi.fn(),
  }
}

export function tmpLocationMock(): {
  path: string
  exists: Mock
  delete: Mock
} {
  return {
    path: Math.random().toString(36).substring(2, 7),
    exists: vi.fn(),
    delete: vi.fn(),
  }
}
