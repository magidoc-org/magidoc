import { templates } from '@magidoc/plugin-starter-variables'

export const DEFAULT_LOGO =
  'https://raw.githubusercontent.com/magidoc-org/magidoc/main/logo/logo_horizontal.png'

export const appLogo = templates.APP_LOGO.vite.getOrDefault(
  import.meta.env,
  DEFAULT_LOGO,
)
