import { execSync } from 'child_process'
import type { SpawnSyncReturns } from 'child_process'

export type RunnerType = 'pnpm' | 'yarn' | 'npm'

export type NpmRunner = {
  type: RunnerType
  runInstall: (directory: string) => Promise<void>
}

export function fetchNpmRunner(): NpmRunner {
  if (isRunnerAvailable('pnpm')) {
    return createRunner({ type: 'pnpm' })
  }

  if (isRunnerAvailable('yarn')) {
    return createRunner({ type: 'yarn', installArgs: '--non-interactive' })
  }

  if (isRunnerAvailable('npm')) {
    return createRunner({ type: 'npm' })
  }

  throw new Error(
    'No NPM runner was found among on of the following: [pnpm, yarn, npm]. Make sure that one of these is installed.',
  )
}

function createRunner({
  type,
  installArgs,
}: {
  type: RunnerType
  installArgs?: string
}): NpmRunner {
  return {
    type,
    runInstall: createInstall(type, installArgs),
  }
}

function createInstall(
  type: RunnerType,
  args = '',
): (directory: string) => Promise<void> {
  return (directory: string) => {
    try {
      execSync(`${type} install ${args}`, {
        cwd: directory,
      })
    } catch (error: unknown) {
      const spawnError = error as SpawnSyncReturns<Buffer>
      const lines = spawnError.stdout.toString().split('\n')

      const meaningfulErrors = lines.filter((line) => line.includes('ERR_'))

      return Promise.reject(
        new Error(
          `'${type} install' failed with status ${
            spawnError.status?.toString() || 'unknown'
          } when executed in directory ${directory}\n${meaningfulErrors.join(
            '\n',
          )}`,
        ),
      )
    }

    return Promise.resolve()
  }
}

function isRunnerAvailable(type: RunnerType): boolean {
  try {
    execSync(`${type} --version`)
    return true
  } catch (error) {
    return false
  }
}
