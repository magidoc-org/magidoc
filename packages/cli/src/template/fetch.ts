import type { Template } from '.'

export type FetchTemplateConfig = {
  target: Template
  version: string
  destination: string
}

const templateUrl =
  'https://github.com/magidoc-org/magidoc/releases/download/<version>/starter-<name>.zip'
export default function fetchTemplate(config: FetchTemplateConfig) {
  const targetUrl = templateUrl
    .replace('<version>', config.version)
    .replace('<name>', config.target)

  console.log(targetUrl)
  // TODO - fetch template
}
