import { Mock, vi } from 'vitest'

export function taskWrapperMock(): {
  skip: Mock<[string], void>
  output: Mock<[string], void>
} {
  return {
    skip: vi.fn(),
    output: vi.fn(),
  }
}
