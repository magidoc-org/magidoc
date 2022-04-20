import z from 'zod'
import { AVAILABLE_TEMPLATES } from '../../../template'
import { getVersion } from '../../../version'

export const ZFileIntrospectionConfiguration = z.object({
  url: z.string().url(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE']).default('POST'),
  headers: z.record(z.string().nonempty(), z.string()).optional(),
})

export const ZFileWebsiteConfiguration = z.object({
  template: z.enum(AVAILABLE_TEMPLATES),
  templateVersion: z.string().nonempty().default(getVersion()),
  output: z.string().nonempty().default('./docs'),
  options: z.record(
    z.string().nonempty(),
    z.union([z.string(), z.number(), z.boolean()]),
  ),
})

export const ZFileConfiguration = z.object({
  introspection: ZFileIntrospectionConfiguration,
  website: ZFileWebsiteConfiguration,
})

export type FileIntrospectionConfiguration = z.infer<
  typeof ZFileIntrospectionConfiguration
>
export type FileWebsiteConfiguration = z.infer<typeof ZFileWebsiteConfiguration>
export type FileConfiguration = z.infer<typeof ZFileConfiguration>
