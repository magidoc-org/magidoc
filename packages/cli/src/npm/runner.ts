import { execSync } from 'child_process'
import type { SpawnSyncReturns } from 'child_process'

export type RunnerType = 'pnpm' | 'yarn' | 'npm'

export type NpmRunner = {
  type: RunnerType
  runInstall: (directory: string) => Promise<void>
}

export function fetchNpmRunner(): NpmRunner {
  if (isRunnerAvailable('pnpm')) {
    return createRunner('pnpm')
  }

  if (isRunnerAvailable('yarn')) {
    return createRunner('yarn')
  }

  if (isRunnerAvailable('npm')) {
    return createRunner('npm')
  }

  throw new Error(
    'No NPM runner was found among on of the following: [pnpm, yarn, npm]. Make sure that one of these is installed.',
  )
}

function createRunner(type: RunnerType): NpmRunner {
  return {
    type,
    runInstall: createInstall(type),
  }
}

function createInstall(type: RunnerType): (directory: string) => Promise<void> {
  return (directory: string) => {
    try {
      execSync(`${type} install`, {
        cwd: directory,
      })
    } catch (error: unknown) {
      const spawnError = error as SpawnSyncReturns<Buffer>
      console.log(spawnError.stdout.toString())
      console.log('-----------')
      console.log(spawnError.stderr.toString())
      return Promise.reject(
        new Error(
          `'${type} install' failed with status ${
            spawnError.status?.toString() || 'unknown'
          } when ran in directory ${directory}`,
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
