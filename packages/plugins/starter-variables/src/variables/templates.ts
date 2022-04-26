import { z } from 'zod'
import { recordConverter, stringConverter } from './converters'
import { createVariable } from './variable'

export default {
  APP_LOGO: createVariable<string>('APP_LOGO', stringConverter()),
  APP_TITLE: createVariable<string>('APP_TITLE', stringConverter()),
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
        zod.record(z.unknown()),
      ]),
    ),
  ),
}
