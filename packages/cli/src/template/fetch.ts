export type FetchTemplateConfig = {
  name: string
  version: string
  destination: string
}

export default function fetchTemplate(config: FetchTemplateConfig) {
  console.log(config)
}
