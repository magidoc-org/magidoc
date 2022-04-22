import { exec } from 'child_process'
import type { SpawnSyncReturns } from 'child_process'
import { promisify } from 'util'

const execPromise = promisify(exec)

export const PACKAGE_MANAGER_TYPES = ['pnpm', 'yarn', 'npm'] as const

export type PackageManagerType = typeof PACKAGE_MANAGER_TYPES[number]

export type CommandConfiguration = {
  cwd: string
  env?: Record<string, string>
}

export type PackageManager = {
  type: PackageManagerType

  runInstall: (config: CommandConfiguration) => Promise<void>

  buildProject: (config: CommandConfiguration) => Promise<void>
}

export async function selectPackageManager(): Promise<PackageManager> {
  if (await isPackageManagerAvailable('pnpm')) {
    return createPnpn()
  }

  if (await isPackageManagerAvailable('yarn')) {
    return createYarn()
  }

  if (await isPackageManagerAvailable('npm')) {
    return createNpm()
  }

  throw new Error(
    `No Package Manager runner was found among on of the following: ${PACKAGE_MANAGER_TYPES.toString()}. Make sure that one of these is installed.`,
  )
}

export function getPackageManager(type: PackageManagerType) {
  if (type === 'pnpm') return createPnpn()
  if (type === 'yarn') return createYarn()
  if (type === 'npm') return createNpm()
  throw new Error(`Unknown NPM Runner ${type as string}.`)
}

function createPnpn(): PackageManager {
  return createRunner({ type: 'pnpm' })
}

function createYarn(): PackageManager {
  return createRunner({ type: 'yarn', installArgs: '--non-interactive' })
}

function createNpm(): PackageManager {
  return createRunner({ type: 'npm' })
}

function createRunner({
  type,
  installArgs,
}: {
  type: PackageManagerType
  installArgs?: string
}): PackageManager {
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
      env: {
        ...process.env,
        ...config.env,
      },
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

export async function isPackageManagerAvailable(
  type: PackageManagerType,
): Promise<boolean> {
  try {
    await execPromise(`${type} --version`)
    return true
  } catch (error) {
    return false
  }
}
