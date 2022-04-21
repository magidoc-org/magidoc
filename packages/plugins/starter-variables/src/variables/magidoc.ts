import { booleanConversion, createVariable } from './variable'

export default {
  MAGIDOC_GENERATE: createVariable<boolean>(
    'MAGIDOC_GENERATE',
    booleanConversion(),
  ),
}
