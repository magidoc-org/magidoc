import { exec } from 'child_process'
import type { SpawnSyncReturns } from 'child_process'
import { promisify } from 'util'

const execPromise = promisify(exec)

export type RunnerType = 'pnpm' | 'yarn' | 'npm'

export type CommandConfiguration = {
  cwd: string
}

export type NpmRunner = {
  type: RunnerType

  runInstall: (config: CommandConfiguration) => Promise<void>

  buildProject: (config: CommandConfiguration) => Promise<void>
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
    runInstall: (config: CommandConfiguration) =>
      runNodeCommand(`${type} install ${installArgs ?? ''}`, config),
    buildProject: (config: CommandConfiguration) =>
      runNodeCommand(`${type} run build`, config),
  }
}

async function runNodeCommand(
  command: string,
  config: CommandConfiguration,
): Promise<void> {
  try {
    await execPromise(command, {
      cwd: config.cwd,
    })
  } catch (error: unknown) {
    const record = error as Record<string, unknown>

    // https://nodejs.org/api/child_process.html#child_processexecsynccommand-options
    if (record['stdout']) {
      const spawnError = error as SpawnSyncReturns<Buffer>
      const lines = spawnError.stdout.toString().split('\n')

      throw new Error(
        `Command '${command}' failed with status ${
          spawnError.status?.toString() || 'unknown'
        } when executed in directory ${
          config.cwd
        }\n\n---- Program Output----\n${lines.join('\n')}`,
      )
    } else if (error instanceof Error) {
      throw new Error(
        `Command '${command}' failed with an unknown error when ran in director ${config.cwd}: ${error.message}`,
        error,
      )
    } else {
      throw new Error(
        `Command failed with unknown error: ${JSON.stringify(error)}`,
      )
    }
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
