import { type ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { createRequire } from 'module'
import path from 'path'

export type CommandConfiguration = {
  cwd: string
  env?: Record<string, string>
}

export type DevServerCommandConfiguration = CommandConfiguration & {
  host: string
  port: number
}

export type PackageManager = {
  runInstall: (config: CommandConfiguration) => Promise<void>
  buildProject: (config: CommandConfiguration) => Promise<void>
  startDevServer: (config: DevServerCommandConfiguration) => Promise<void>
}

export function createPackageManager(): PackageManager {
  const pnpm = resolveBundledPnpm()

  const run = (args: string[], config: CommandConfiguration) => runPnpm([pnpm, ...args], config)

  return {
    runInstall: (config) => run(['install', '--prefer-frozen-lockfile'], config),
    buildProject: (config) => run(['run', 'build'], config),
    startDevServer: (config) => run(['run', 'dev', '--host', config.host, '--port', config.port.toString()], config),
  }
}

function resolveBundledPnpm(): string {
  try {
    const require = createRequire(import.meta.url)
    const manifestPath = require.resolve('pnpm')
    const manifest = require(manifestPath) as { bin: { pnpm: string } }
    return path.join(path.dirname(manifestPath), manifest.bin.pnpm)
  } catch (error) {
    throw new Error('Could not resolve the pnpm bundled with the Magidoc CLI. Reinstalling the CLI should fix it.', {
      cause: error,
    })
  }
}

function runPnpm(args: string[], config: CommandConfiguration): Promise<void> {
  const child = spawn(process.execPath, args, {
    cwd: config.cwd,
    env: {
      ...getCurrentEnvironment(),
      ...config.env,
    },
  })

  return waitForChild(child, args.join(' '), config)
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
