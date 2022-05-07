import type { MagidocConfiguration } from '../../config/types'

export type GenerationConfig = MagidocConfiguration & {
  clean: boolean
}
