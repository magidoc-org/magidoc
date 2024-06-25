export type {}

declare global {
  function fail(error?: unknown): never
}

global.fail = (error?: unknown) => {
  const result = String(error)
  throw new Error(`Test failed${error ? `: ${result}` : ''}`)
}
