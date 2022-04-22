import type { RunnerType } from '../../npm/runner'
import type { Template } from '../../template'

export type InitConfig = {
  runnerType: RunnerType
  template: Template
  templateVersion: string
  destination: string
}
