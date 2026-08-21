import { type ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { createRequire } from 'module'
import path from 'path'

// 'pnpm' is the pnpm bundled with the CLI, which is the version that resolved the template's
// lockfile. 'system-pnpm' runs the one on the PATH instead.
export const PACKAGE_MANAGER_TYPES = ['pnpm', 'system-pnpm', 'bun', 'yarn', 'npm'] as const

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
  return Promise.resolve(createBundledPnpm())
}

export function getPackageManager(type: PackageManagerType) {
  if (type === 'pnpm') return createBundledPnpm()
  if (type === 'system-pnpm') return createSystemPnpm()
  if (type === 'bun') return createBun()
  if (type === 'yarn') return createYarn()
  if (type === 'npm') return createNpm()
  throw new Error(`Unknown package manager ${type as string}.`)
}

function resolveBundledPnpm(): string {
  try {
    // pnpm only exposes './package.json' in its exports map, so the entrypoint cannot be
    // resolved as a subpath and has to be read off the manifest.
    const require = createRequire(import.meta.url)
    const manifestPath = require.resolve('pnpm')
    const manifest = require(manifestPath) as { bin: { pnpm: string } }
    return path.join(path.dirname(manifestPath), manifest.bin.pnpm)
  } catch (error) {
    throw new Error(
      'Could not resolve the pnpm bundled with the Magidoc CLI. Reinstall the CLI, or use --package-manager system-pnpm to run a pnpm from your PATH instead.',
      { cause: error },
    )
  }
}

function createBundledPnpm(): PackageManager {
  const bundledPnpm = resolveBundledPnpm()

  const run = (args: string[], config: CommandConfiguration) => runNodeCommand([bundledPnpm, ...args], config)

  return {
    type: 'pnpm',
    // Prefer rather than force, because --template-version can pair a template with a CLI
    // whose pnpm cannot read its lockfile. That should re-resolve, not fail the build.
    runInstall: (config) => run(['install', '--prefer-frozen-lockfile'], config),
    buildProject: (config) => run(['run', 'build'], config),
    startDevServer: (config) => run(['run', 'dev', '--host', config.host, '--port', config.port.toString()], config),
  }
}

function createSystemPnpm(): PackageManager {
  return createRunner({ type: 'system-pnpm', command: 'pnpm' })
}

function createYarn(): PackageManager {
  return createRunner({ type: 'yarn', installArgs: ['--non-interactive'] })
}

function createNpm(): PackageManager {
  return createRunner({ type: 'npm', installArgs: ['--legacy-peer-deps'] })
}

function createBun(): PackageManager {
  return createRunner({ type: 'bun' })
}

function createRunner({
  type,
  command = type,
  installArgs,
}: {
  type: PackageManagerType
  command?: string
  installArgs?: string[]
}): PackageManager {
  return {
    type,
    runInstall: (config: CommandConfiguration) => runShellCommand(command, ['install', ...(installArgs || [])], config),
    buildProject: (config: CommandConfiguration) => runShellCommand(command, ['run', 'build'], config),
    startDevServer: (config: DevServerCommandConfiguration) =>
      runShellCommand(command, ['run', 'dev', '--host', config.host, '--port', config.port.toString()], config),
  }
}

function runNodeCommand(args: string[], config: CommandConfiguration): Promise<void> {
  const child = spawn(process.execPath, args, {
    cwd: config.cwd,
    env: buildEnvironment(config),
  })

  return waitForChild(child, [process.execPath, ...args].join(' '), config)
}

function runShellCommand(command: string, args: string[], config: CommandConfiguration): Promise<void> {
  const commandLine = [command, ...args.map(quoteShellArgument)].join(' ')

  const child = spawn(commandLine, {
    cwd: config.cwd,
    shell: true,
    env: buildEnvironment(config),
  })

  return waitForChild(child, commandLine, config)
}

function quoteShellArgument(argument: string): string {
  if (process.platform === 'win32') {
    if (argument.includes('"')) {
      throw new Error(`Cannot pass the argument '${argument}' to a shell on Windows because it contains a quote.`)
    }

    return `"${argument}"`
  }

  return `'${argument.replaceAll("'", `'\\''`)}'`
}

function waitForChild(
  child: ChildProcessWithoutNullStreams,
  commandLine: string,
  config: CommandConfiguration,
): Promise<void> {
  return new Promise((resolve, reject) => {
    let output = ''
    const stdHandler = (chunk: Buffer) => {
      output += String(chunk)
    }
    child.stdout.on('data', stdHandler)
    child.stderr.on('data', stdHandler)

    child.on('error', (error) => {
      reject(
        new Error(`Failed to launch command '${commandLine}' in directory ${config.cwd}: ${error.message}`, {
          cause: error,
        }),
      )
    })

    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(
          new Error(
            `Command '${commandLine}' failed with status ${
              code?.toString() || 'unknown'
            } when executed in directory ${config.cwd}\n\n---- Program Output----\n${output}`,
          ),
        )
      }
    })
  })
}

function buildEnvironment(config: CommandConfiguration): Record<string, string> {
  return {
    ...getCurrentEnvironment(),
    ...config.env,
  }
}

function getCurrentEnvironment(): Record<string, string> {
  return Object.keys(process.env).reduce((previous, key) => {
    const lowerKey = key.toLowerCase()
    if (lowerKey.startsWith('vercel') || lowerKey.startsWith('netlify') || lowerKey.startsWith('cf_pages')) {
      return previous
    }

    return {
      ...previous,
      [key]: process.env[key],
    }
  }, {})
}
