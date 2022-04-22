import type { PackageManagerType } from '../../node/packageManager'
import type { Template } from '../../template'

export type InitConfig = {
  packageManagerType: PackageManagerType
  template: Template
  templateVersion: string
  destination: string
}
