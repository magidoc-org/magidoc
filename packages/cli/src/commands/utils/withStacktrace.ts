export async function withStacktrace(
  stacktrace: boolean,
  handler: () => Promise<void> | void,
) {
  try {
    await handler()
  } catch (error) {
    process.exitCode = 2

    if (stacktrace) {
      console.log()
      console.log('------- Stacktrace -------')
      console.log(error)
    } else {
      if (error instanceof Error) {
        console.log(error.message)
      }

      console.log()
      console.log('For a more detailed output, run with --stacktrace')
    }
  }
}
