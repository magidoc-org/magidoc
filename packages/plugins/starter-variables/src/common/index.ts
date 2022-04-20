import { createVariable, stringConversion } from '../variable'

export default {
  APP_LOGO: createVariable<string>('APP_LOGO', stringConversion()),
  APP_TITLE: createVariable<string>('APP_TITLE', stringConversion()),
}
