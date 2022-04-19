import { createVariable, stringConversion } from '../variable'

export default {
  APP_LOGO_PATH: createVariable<string>('APP_LOGO_PATH', stringConversion()),
  APP_TITLE: createVariable<string>('APP_TITLE', stringConversion()),
}
