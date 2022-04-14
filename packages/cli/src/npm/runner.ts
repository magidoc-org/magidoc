import { exec } from 'child_process'
import type { SpawnSyncReturns } from 'child_process'
import { promisify } from 'util'

const execPromise = promisify(exec)

export type RunnerType = 'pnpm' | 'yarn' | 'npm'

export type NpmRunner = {
  type: RunnerType
  runInstall: (directory: string) => Promise<void>
}

export async function fetchNpmRunner(): Promise<NpmRunner> {
  if (await isRunnerAvailable('pnpm')) {
    return createRunner({ type: 'pnpm' })
  }

  if (await isRunnerAvailable('yarn')) {
    return createRunner({ type: 'yarn', installArgs: '--non-interactive' })
  }

  if (await isRunnerAvailable('npm')) {
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
  return async (directory: string) => {
    try {
      await execPromise(`${type} install ${args}`, {
        cwd: directory,
      })
    } catch (error: unknown) {
      // https://nodejs.org/api/child_process.html#child_processexecsynccommand-options
      const spawnError = error as SpawnSyncReturns<Buffer>
      const lines = spawnError.stdout.toString().split('\n')

      const meaningfulErrors = lines.filter((line) => line.includes('ERR_'))

      throw new Error(
        `'${type} install' failed with status ${
          spawnError.status?.toString() || 'unknown'
        } when executed in directory ${directory}\n${meaningfulErrors.join(
          '\n',
        )}`,
      )
    }

    return Promise.resolve()
  }
}

async function isRunnerAvailable(type: RunnerType): Promise<boolean> {
  try {
    await execPromise(`${type} --version`)
    return true
  } catch (error) {
    return false
  }
}
