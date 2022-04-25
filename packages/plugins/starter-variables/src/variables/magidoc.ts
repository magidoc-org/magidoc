import { booleanConverter } from './converters'
import { createVariable } from './variable'

export default {
  MAGIDOC_GENERATE: createVariable<boolean>(
    'MAGIDOC_GENERATE',
    booleanConverter(),
  ),
}
