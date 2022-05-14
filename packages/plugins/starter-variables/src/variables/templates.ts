import type { ZodType } from 'zod'
import { arrayConverter, recordConverter, stringConverter } from './converters'
import { createVariable } from './variable'

export type Page = {
  title: string
  content: string | Page[]
}

export default {
  APP_LOGO: createVariable<string>('APP_LOGO', stringConverter()),
  APP_TITLE: createVariable<string>('APP_TITLE', stringConverter()),
  APP_FAVICON: createVariable<string>('APP_FAVICON', stringConverter()),
  SITE_ROOT: createVariable<string>('SITE_ROOT', stringConverter()),
  SITE_META: createVariable<Record<string, string | undefined>>(
    'SITE_META',
    recordConverter((zod) => zod.string()),
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
          title: zod.string().nonempty(),
          content: zod.union([zod.array(type), zod.string().nonempty()]),
        }),
      )
      return type
    }),
  ),
}
