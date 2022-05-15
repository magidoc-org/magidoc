import type { ZodIssue } from 'zod'
import { cyan } from '../commands/utils/outputColors'

export function formatZodIssues(issues: ZodIssue[]): string[] {
  return issues.map((issue) => {
    const path = formatErrorPath(issue.path)
    switch (issue.code) {
      case 'invalid_type':
        return `  ‣ Expected: '${issue.expected}' but received '${issue.received}' at path '${path}'`
      case 'invalid_union':
        const formattedErrors = issue.unionErrors
          .flatMap((current) =>
            current.issues.map((issue) => `    - ${issue.message}`),
          )
          .join('\n')
        return `  ‣ ${issue.message} at path '${path}':\n${formattedErrors}`
      default:
        return `  ‣ ${issue.message} at path '${path}'`
    }
  })
}

function formatErrorPath(path: (string | number)[]): string {
  const result = path.reduce((previous: string, current: string | number) => {
    if (typeof current === 'number') return previous + `[${current}]`
    if (previous === '') return String(current)
    return `${previous}.${String(current)}`
  }, '')

  return cyan(result)
}
