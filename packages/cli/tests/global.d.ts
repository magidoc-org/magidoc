import 'jest-extended'

declare global {
  function removeAnsiColors(input: string): string
}
