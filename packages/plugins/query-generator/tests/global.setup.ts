export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function fail(error?: any): never
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.fail = (error?: any) => {
  const result = String(error)
  throw new Error(`Test failed${error ? `: ${result}` : ''}`)
}
