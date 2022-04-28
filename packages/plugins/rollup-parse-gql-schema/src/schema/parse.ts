import { glob } from 'glob'
import {
  buildSchema,
  introspectionFromSchema,
  IntrospectionQuery,
} from 'graphql'
import { readFile } from 'fs/promises'

export type Parameters = {
  globPaths: string[]
}

export async function parseGraphqlSchema(
  options: Parameters,
): Promise<IntrospectionQuery> {
  const rawSchema = await readFullSchema(options.globPaths)
  const schema = buildSchema(rawSchema)
  return introspectionFromSchema(schema)
}

async function readFullSchema(globPaths: string[]): Promise<string> {
  const paths = (
    await Promise.all(globPaths.map((path) => readGlobPaths(path)))
  ).flatMap((it) => it)

  if (paths.length === 0) {
    throw new Error(
      `No paths found matching target glob patterns: ${globPaths.toString()}.\nIf you used relative paths, make sure the paths are relative to where the node command was launched or use absolute paths.`,
    )
  }

  return (await Promise.all(paths.map((path) => readFile(path)))).join('\n\n')
}

async function readGlobPaths(path: string): Promise<string[]> {
  console.log('path', path)
  return new Promise((resolve, reject) => {
    glob(path, (error: Error | null, matches: string[]) => {
      if (error) {
        return reject(
          new Error(`Could not read path: ${path}`, {
            cause: error,
          }),
        )
      }

      resolve(matches)
    })
  })
}
