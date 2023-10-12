import { spawn, exec } from 'child_process'
import { promisify } from 'util'

const execPromise = promisify(exec)

export const PACKAGE_MANAGER_TYPES = ['pnpm', 'yarn', 'npm'] as const

export type PackageManagerType = (typeof PACKAGE_MANAGER_TYPES)[number]

export type CommandConfiguration = {
  cwd: string
  env?: Record<string, string>
}

export type DevServerCommandConfiguration = CommandConfiguration & {
  host: string
  port: number
}

export type PackageManager = {
  type: PackageManagerType

  runInstall: (config: CommandConfiguration) => Promise<void>
  buildProject: (config: CommandConfiguration) => Promise<void>
  startDevServer: (config: DevServerCommandConfiguration) => Promise<void>
}

export async function selectPackageManager(): Promise<PackageManager> {
  if (await isPackageManagerAvailable('pnpm')) {
    return createPnpm()
  }

  if (await isPackageManagerAvailable('npm')) {
    return createNpm()
  }

  if (await isPackageManagerAvailable('yarn')) {
    return createYarn()
  }

  throw new Error(
    `No Package Manager runner was found among on of the following: ${PACKAGE_MANAGER_TYPES.toString()}. Make sure that one of these is installed.`,
  )
}

export function getPackageManager(type: PackageManagerType) {
  if (type === 'pnpm') return createPnpm()
  if (type === 'yarn') return createYarn()
  if (type === 'npm') return createNpm()
  throw new Error(`Unknown package manager ${type as string}.`)
}

function createPnpm(): PackageManager {
  return createRunner({ type: 'pnpm' })
}

function createYarn(): PackageManager {
  return createRunner({ type: 'yarn', installArgs: ['--non-interactive'] })
}

function createNpm(): PackageManager {
  return createRunner({ type: 'npm', installArgs: ['--legacy-peer-deps'] })
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
    startDevServer: (config: DevServerCommandConfiguration) =>
      runNodeCommand(
        type,
        ['run', 'dev', '--host', config.host, '--port', config.port.toString()],
        config,
      ),
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
      shell: true,
      env: {
        ...getCurrentEnvironment(),
        ...config.env,
      },
    })

    let output = ''
    const stdHandler = (chunk: Buffer) => {
      output += String(chunk)
    }
    child.stdout.on('data', stdHandler)
    child.stderr.on('data', stdHandler)

    child.on('error', (error) => {
      reject(
        new Error(
          `Failed to launch command '${command}' with args '${args.toString()}' and config '${JSON.stringify(
            config,
          )}': ${error.message}`,
          {
            cause: error,
          },
        ),
      )
    })

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

function getCurrentEnvironment(): Record<string, string> {
  return Object.keys(process.env).reduce((previous, key) => {
    const lowerKey = key.toLowerCase()
    if (
      lowerKey.startsWith('vercel') ||
      lowerKey.startsWith('netlify') ||
      lowerKey.startsWith('cf_pages')
    ) {
      return previous
    }

    return {
      ...previous,
      [key]: process.env[key],
    }
  }, {})
}
