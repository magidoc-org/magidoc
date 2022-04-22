import { newTask as buildNewTask } from '../../tasks'
import type { Task, TaskExecutor, TaskParams } from '../../tasks'
import type { TmpLocation } from '../../template/tmp'
import type { PackageManager } from '../../node/packageManager'

export type InitTaskContext = {
  tmpArchive: TmpLocation
  runner: PackageManager
}

export function newTask(params: TaskParams<InitTaskContext>): InitTask {
  return buildNewTask(params)
}

export type InitTaskExecutor = TaskExecutor<InitTaskContext>

export type InitTask = Task<InitTaskContext>
