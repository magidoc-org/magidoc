import { newTask as buildNewTask } from '../../tasks'
import type { Task, TaskExecutor, TaskParams } from '../../tasks'
import type { TmpLocation } from '../../template/tmp'
import type { NpmRunner } from '../../npm/runner'

export type InitTaskContext = {
  tmpArchive: TmpLocation
  runner: NpmRunner
}

export function newTask(params: TaskParams<InitTaskContext>): InitTask {
  return buildNewTask(params)
}

export type InitTaskExecutor = TaskExecutor<InitTaskContext>

export type InitTask = Task<InitTaskContext>
