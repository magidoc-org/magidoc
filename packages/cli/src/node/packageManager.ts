import { spawn, exec } from 'child_process'
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
  return createRunner({ type: 'yarn', installArgs: ['--non-interactive'] })
}

function createNpm(): PackageManager {
  return createRunner({ type: 'npm' })
}

function createRunner({
  type,
  installArgs,
}: {
  type: PackageManagerType
  installArgs?: string[]
}): PackageManager {
  return {
    type,
    runInstall: (config: CommandConfiguration) =>
      runNodeCommand(type, ['install', ...(installArgs || [])], config),
    buildProject: (config: CommandConfiguration) =>
      runNodeCommand(type, ['run', 'build'], config),
  }
}

async function runNodeCommand(
  command: string,
  args: string[],
  config: CommandConfiguration,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: config.cwd,
      env: {
        ...process.env,
        ...config.env,
      },
    })

    let output = ''
    child.stdout.on('data', (chunk) => (output += String(chunk)))
    child.stderr.on('data', (chunk) => (output += String(chunk)))

    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(
          new Error(
            `Command '${command}' failed with status ${
              code?.toString() || 'unknown'
            } when executed in directory ${
              config.cwd
            }\n\n---- Program Output----\n${output}`,
          ),
        )
      }
    })
  })
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
