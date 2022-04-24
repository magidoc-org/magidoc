import z from 'zod'
import { AVAILABLE_TEMPLATES } from '../../../template'
import { getVersion } from '../../../version'
import path from 'path'

const ZPath = z
  .string()
  .nonempty()
  .transform((arg) => path.resolve(arg))

export const ZIntrospectionConfiguration = z.union([
  z.object({
    type: z.literal('url'),
    url: z.string().url(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE']).default('POST'),
    headers: z.record(z.string().nonempty(), z.string()).optional(),
  }),
  z.object({
    type: z.literal('file'),
    location: ZPath,
  }),
  z.object({
    type: z.literal('raw'),
    content: z.string().nonempty(),
  }),
])

export const ZWebsiteConfiguration = z.object({
  template: z.enum(AVAILABLE_TEMPLATES),
  templateVersion: z.string().nonempty().default(getVersion()),
  output: ZPath.default(path.resolve('./docs')),
  options: z.record(
    z.string().nonempty(),
    z.union([z.string(), z.number(), z.boolean()]),
  ),
})

export const ZMagidocConfiguration = z.object({
  introspection: ZIntrospectionConfiguration,
  website: ZWebsiteConfiguration,
})

export type IntrospectionConfiguration = z.infer<
  typeof ZIntrospectionConfiguration
>
export type WebsiteConfiguration = z.infer<typeof ZWebsiteConfiguration>
export type MagidocConfiguration = z.infer<typeof ZMagidocConfiguration>
