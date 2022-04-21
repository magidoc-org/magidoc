import { FileConfiguration, ZFileConfiguration } from './types'

export function parseConfiguration(content: unknown): FileConfiguration {
  const result = ZFileConfiguration.safeParse(content)
  if (result.success) {
    return result.data
  }

  const issues = result.error.issues
  const formattedIssues = issues.map((issue) => {
    const path = formatErrorPath(issue.path)
    switch (issue.code) {
      case 'invalid_type':
        return `  - ${issue.message} '${issue.expected}' but received '${issue.received}' at path ${path}`
      default:
        return `  - ${issue.message} at path ${path}`
    }
  })

  throw new Error(
    `${
      issues.length
    } issues were found with the Magidoc configuration provided:\n${formattedIssues.join(
      '\n',
    )}`,
  )
}

function formatErrorPath(path: (string | number)[]): string {
  return path.reduce((previous: string, current: string | number) => {
    if (typeof current === 'number') return previous + `[${current}]`
    if (previous === '') return String(current)
    return `${previous}.${String(current)}`
  }, '')
}
