import { printError, printInfo, printLine, printStacktrace } from './log'

export async function withStacktrace(
  stacktrace: boolean,
  handler: () => Promise<void> | void,
) {
  try {
    await handler()
  } catch (error) {
    process.exitCode = 2

    if (stacktrace) {
      printStacktrace(error)
    } else {
      if (error instanceof Error) {
        printError(error)
      }

      printLine()
      printInfo('For a more detailed output, run with --stacktrace')
    }
  }
}
