import type { Variable } from '@magidoc/plugin-starter-variables'
import { pathToFileURL } from 'url'
import z from 'zod'
import { formatZodIssues } from '../config/zod'

const ZMagidocTemplateConfig = z.object({
  SUPPORTED_OPTIONS: z.array(
    z.object({
      name: z.string().min(1),
      key: z.string().min(1),
      asEnv: z.function(),
      zod: z.object({
        type: z.function(),
      }),
      get: z.function(),
      getOrDefault: z.function(),
    }),
  ),
  SCHEMA_TARGET_LOCATION: z.string().min(1),
  STATIC_ASSETS_LOCATION: z.string().min(1),
  ENV_FILE_LOCATION: z.string().min(1),
})

export type RawMagidocTemplateConfig = {
  SUPPORTED_OPTIONS: ReadonlyArray<Variable<unknown>>
  SCHEMA_TARGET_LOCATION: string
  STATIC_ASSETS_LOCATION: string
  ENV_FILE_LOCATION: string
}

export async function loadTemplateConfig(
  path: string,
): Promise<RawMagidocTemplateConfig> {
  return parseTemplateConfig(
    (await import(pathToFileURL(path).toString())) as unknown,
  )
}

export function parseTemplateConfig(
  content: unknown,
): RawMagidocTemplateConfig {
  const result = ZMagidocTemplateConfig.safeParse(content)
  if (!result.success) {
    const formattedIssues = formatZodIssues(result.error.issues)
    throw new Error(
      `Invalid template configuration found:\nConfig: ${JSON.stringify(
        content,
      )}\n${formattedIssues.join(
        '\n',
      )}\n\nThis error is not supposed to occur and is likely a misconfiguration of the template. You should open an issue if you ever see it.`,
    )
  }

  // This is rather unsafe. We validate the object roughly and automatically
  // cast the content as a template config instead of using zod result
  // This is done just to have basic assertions on the template config to make sure it was not tempered accidentally
  // This is an attempt to protect against incomplete configuration, but it is not bulletproof
  return content as RawMagidocTemplateConfig
}
