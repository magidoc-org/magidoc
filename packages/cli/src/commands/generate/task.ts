import type { Variable } from '@magidoc/plugin-starter-variables'

import type { NpmRunner } from '../../npm/runner'
import { newTask as buildNewTask } from '../../tasks'
import type { Task, TaskExecutor, TaskParams } from '../../tasks'
import type { TmpLocation } from '../../template/tmp'

export type GenerateTaskContext = {
  tmpArchive: TmpLocation
  tmpDirectory: TmpLocation
  npmRunner: NpmRunner
  templateConfiguration: TemplateConfiguration
}

export type TemplateConfiguration = {
  supportedOptions: Variable<unknown>[]
  schemaTargetLocation: string
}

export function newTask(params: TaskParams<GenerateTaskContext>): GenerateTask {
  return buildNewTask(params)
}

export type GenerateTaskExecutor = TaskExecutor<GenerateTaskContext>

export type GenerateTask = Task<GenerateTaskContext>
