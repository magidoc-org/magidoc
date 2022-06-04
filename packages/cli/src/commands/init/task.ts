import type { TmpLocation } from '../../template/tmp'
import type { PackageManager } from '../../node/packageManager'

export type InitTaskContext = {
  tmpArchive: TmpLocation
  tmpDirectory: TmpLocation
  packageManager: PackageManager
}
