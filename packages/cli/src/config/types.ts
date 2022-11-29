import z from 'zod'
import { AVAILABLE_TEMPLATES } from '../template'
import { getVersion } from '../version'
import path from 'path'
import { isDirectory } from '../commands/utils/fileUtils'

const ZPath = z
  .string()
  .min(1)
  .transform((arg) => path.resolve(arg))

const ZTemplate = z
  .string()
  .min(1)
  .refine(
    (arg) => {
      if (AVAILABLE_TEMPLATES.some((template) => template === arg)) {
        return true
      }

      return isDirectory(arg)
    },
    {
      message: `Template should be either a valid template name among [${AVAILABLE_TEMPLATES.join(
        ', ',
      )}] or a path to a Magidoc template directory`,
    },
  )

export const ZIntrospectionConfiguration = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('url'),
    url: z.string().url(),
    query: z.string().min(1).optional(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE']).default('POST'),
    headers: z.record(z.string().min(1), z.string()).optional(),
  }),
  z.object({
    type: z.literal('sdl'),
    paths: z.array(ZPath).nonempty(),
  }),
  z.object({
    type: z.literal('raw'),
    content: z.string().min(1),
  }),
  z.object({
    type: z.literal('none'),
  }),
])

export const ZWebsiteConfiguration = z.object({
  template: ZTemplate,
  templateVersion: z.string().min(1).default(getVersion()),
  output: ZPath.default(path.resolve('./docs')),
  staticAssets: ZPath.optional(),
  options: z.record(z.string().min(1), z.unknown()).default({}),
})

export const ZDevConfiguration = z
  .object({
    watch: z.array(ZPath).default([]),
  })
  .default({})

export const ZMagidocConfiguration = z.object({
  introspection: ZIntrospectionConfiguration,
  website: ZWebsiteConfiguration,
  dev: ZDevConfiguration,
})

export type IntrospectionConfiguration = z.infer<
  typeof ZIntrospectionConfiguration
>
export type DevConfiguration = z.infer<typeof ZDevConfiguration>
export type WebsiteConfiguration = z.infer<typeof ZWebsiteConfiguration>
export type MagidocConfiguration = z.infer<typeof ZMagidocConfiguration>
