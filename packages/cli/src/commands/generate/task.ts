import type { Variable } from '@magidoc/plugin-starter-variables'

import type { PackageManager } from '../../node/packageManager'
import { newTask as buildNewTask } from '../../tasks'
import type { Task, TaskExecutor, TaskParams } from '../../tasks'
import type { TmpLocation } from '../../template/tmp'

export type GenerateTaskContext = {
  tmpArchive: TmpLocation
  tmpDirectory: TmpLocation
  templateConfiguration: TemplateConfiguration
  packageManager: PackageManager
}

export type TemplateConfiguration = {
  supportedOptions: ReadonlyArray<Variable<unknown>>
  schemaTargetLocation: string
  staticAssetsLocation: string
}

export function newTask(params: TaskParams<GenerateTaskContext>): GenerateTask {
  return buildNewTask(params)
}

export type GenerateTaskExecutor = TaskExecutor<GenerateTaskContext>

export type GenerateTask = Task<GenerateTaskContext>
