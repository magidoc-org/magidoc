// import { magidoc, templates, toVariablesFile } from '@magidoc/plugin-starter-variables'
// import {}
// import { describe, expect, it, vi } from 'vitest'
// import { installDependenciesTask } from '../../../src/tasks/all/installDependencies'
// import { writeFile } from 'fs/promises'
// import { taskWrapperMock } from './utils'

// const variable = magidoc.MAGIDOC_GENERATE

// vi.mock('fs/promises', () => ({
//   writeFile: vi.fn(),
// }))

// vi.mock('@magidoc/plugin-starter-variables', () => ({
//   toVariablesFile: vi.fn(),

// }))

// describe('writing environment file', () => {
//   describe('task is enabled', () => {
//     const ctx = {
//       templateConfiguration: {
//         envFileLocation: './potato.json',
//         supportedOptions: [templates.APP_FAVICON],
//       },
//     }

//     it('write the variables to the target file', async () => {
//       const task = installDependenciesTask()
//       toVariablesFile
//       await task.executor(ctx, taskWrapperMock())
//       expect(ctx.packageManager.runInstall).toHaveBeenCalledWith({
//         cwd: ctx.tmpDirectory.path,
//       })
//     })
//   })
// })
