import glob from 'fast-glob'
import { buildSchema, type GraphQLSchema } from 'graphql'
import { readFile } from 'fs/promises'

export type Parameters = {
  globPaths: string[]
}

export async function parseGraphqlSchema(
  options: Parameters,
): Promise<GraphQLSchema> {
  const rawSchema = await readFullSchema(options.globPaths)

  try {
    return buildSchema(rawSchema)
  } catch (error) {
    throw new Error(
      `Unable to extract a GraphQL introspection from provided schema: ${String(
        error,
      )}`,
      {
        cause: error as Error,
      },
    )
  }
}

async function readFullSchema(globPaths: string[]): Promise<string> {
  const paths = new Set(
    (await Promise.all(globPaths.map((path) => readGlobPaths(path)))).flatMap(
      (it) => it,
    ),
  )

  if (paths.size === 0) {
    throw new Error(
      `No paths found matching target glob patterns: [${globPaths.toString()}].\nIf you used relative paths, make sure the paths are relative to where the node command was launched or use absolute paths.`,
    )
  }

  return (
    await Promise.all(
      Array.from(paths.values()).map((path) =>
        readFile(path).then((buff) => buff.toString()),
      ),
    )
  ).join('\n\n')
}

async function readGlobPaths(globPath: string): Promise<string[]> {
  // Backslashes in windows paths are not supported by fast-glob
  return [...new Set(await glob(globPath.replaceAll('\\', '/'), { dot: true }))]
}
