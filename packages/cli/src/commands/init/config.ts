import type { PackageManagerType } from '../../node/packageManager'
import type { Template } from '../../template'

export type InitConfig = {
  packageManager: PackageManagerType
  destination: string
  website: {
    template: Template
    templateVersion: string
  }
}
