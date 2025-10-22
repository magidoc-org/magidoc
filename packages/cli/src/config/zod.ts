import type { core } from 'zod'
import { cyan } from '../commands/utils/outputColors'

export function formatZodIssues(issues: core.$ZodIssue[]): string[] {
  return issues.map((issue) => {
    const path = formatErrorPath(issue.path)
    switch (issue.code) {
      case 'invalid_type':
        return `  ‣ Expected: '${issue.expected}' at path '${path}'`
      case 'invalid_union': {
        if (issue.errors.length === 0) {
          return `  ‣ ${issue.message} at path '${path}'`
        }

        const formattedErrors = issue.errors
          .flatMap((current) => current.map((issue) => `    - ${issue.message}`))
          .join('\n')
        return `  ‣ ${issue.message} at path '${path}':\n${formattedErrors}`
      }
      default:
        return `  ‣ ${issue.message} at path '${path}'`
    }
  })
}

function formatErrorPath(path: PropertyKey[]): string {
  const result = path.reduce((previous: string, current: PropertyKey) => {
    if (typeof current === 'number') return `${previous}[${current}]`
    if (previous === '') return String(current)
    return `${previous}.${String(current)}`
  }, '')

  return cyan(result)
}
