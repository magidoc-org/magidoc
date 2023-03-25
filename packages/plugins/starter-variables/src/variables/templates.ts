import type { ZodType } from 'zod'
import { arrayConverter, recordConverter, stringConverter } from './converters'
import { enumConverter } from './converters/enum'
import { createVariable } from './variable'

export type Page = {
  title: string
  content: string | Page[]
}

export type ExternalLink = {
  label: string
  href: string
  position?: 'header' | 'navigation'
  kind?: string
  group?: string
}

export type AllowedDirective = {
  name: string
  args: string[]
}

export type FieldSorting = 'default' | 'alphabetical'

export type ArgumentSorting = 'default' | 'alphabetical'

export default {
  APP_LOGO: createVariable<string>('APP_LOGO', stringConverter()),
  APP_TITLE: createVariable<string>('APP_TITLE', stringConverter()),
  APP_FAVICON: createVariable<string>('APP_FAVICON', stringConverter()),
  SITE_ROOT: createVariable<string>('SITE_ROOT', stringConverter()),
  SITE_META: createVariable<Record<string, string | undefined>>(
    'SITE_META',
    recordConverter((zod) => zod.string()),
  ),
  CUSTOM_STYLES: createVariable<Array<string | undefined>>(
    'CUSTOM_STYLES',
    arrayConverter((zod) => zod.string()),
  ),
  FIELDS_SORTING: createVariable<FieldSorting>(
    'FIELDS_SORTING',
    enumConverter(['default', 'alphabetical']),
  ),
  ARGUMENTS_SORTING: createVariable<ArgumentSorting>(
    'ARGUMENTS_SORTING',
    enumConverter(['default', 'alphabetical']),
  ),
  QUERY_GENERATION_FACTORIES: createVariable<
    Record<
      string,
      string | boolean | number | Record<string, unknown> | null | undefined
    >
  >(
    'QUERY_GENERATION_FACTORIES',
    recordConverter((zod) =>
      zod.union([
        zod.string(),
        zod.boolean(),
        zod.number(),
        zod.null(),
        zod.record(zod.unknown()),
      ]),
    ),
  ),
  PAGES: createVariable<Array<Page | undefined>>(
    'PAGES',
    arrayConverter((zod) => {
      const type: ZodType<Page> = zod.lazy(() =>
        zod.object({
          title: zod.string().min(1),
          content: zod.union([zod.array(type), zod.string().min(1)]),
        }),
      )
      return type
    }),
  ),
  EXTERNAL_LINKS: createVariable<Array<ExternalLink | undefined>>(
    'EXTERNAL_LINKS',
    arrayConverter((zod) => {
      return zod.object({
        label: zod.string().min(1),
        href: zod.string().min(1),
        position: zod
          .union([zod.literal('header'), zod.literal('navigation')])
          .optional(),
        kind: zod.string().min(1).optional(),
        group: zod.string().min(1).optional(),
      })
    }),
  ),
  DIRECTIVES: createVariable<Array<AllowedDirective | undefined>>(
    'DIRECTIVES',
    arrayConverter((zod) => {
      return zod.object({
        name: zod.string().min(1),
        args: zod.array(zod.string()),
      })
    }),
  ),
}
