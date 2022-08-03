/* eslint-disable no-console */
export function printLine() {
  console.log()
}

export function printSeparator() {
  console.log()
  console.log('-----------')
  console.log()
}

export function printInfo(message: string) {
  console.log(message)
}

export function printStacktrace(error: unknown) {
  printLine()
  console.log('------- Stacktrace -------')
  console.log(error)
}

export function printError(error: Error | string) {
  console.error(error instanceof Error ? error.message : error)
}

export function printWarning(message: string) {
  console.warn(message)
}
