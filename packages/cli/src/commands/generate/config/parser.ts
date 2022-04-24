import { MagidocConfiguration, ZMagidocConfiguration } from './types'
import chalk from 'chalk'

export function parseConfiguration(content: unknown): MagidocConfiguration {
  const result = ZMagidocConfiguration.safeParse(content)
  if (result.success) {
    return result.data
  }

  const issues = result.error.issues
  const formattedIssues = issues.map((issue) => {
    const path = formatErrorPath(issue.path)
    switch (issue.code) {
      case 'invalid_type':
        return `  ‣ ${issue.message} '${issue.expected}' but received '${issue.received}' at path '${path}'`
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

  const pluralIssue = issues.length > 1 ? 'issues' : 'issue'
  const issuesText = chalk.red(`${issues.length} ${pluralIssue}`)
  throw new Error(
    `${issuesText} found with the Magidoc configuration provided:\n${formattedIssues.join(
      '\n',
    )}`,
  )
}

function formatErrorPath(path: (string | number)[]): string {
  const result = path.reduce((previous: string, current: string | number) => {
    if (typeof current === 'number') return previous + `[${current}]`
    if (previous === '') return String(current)
    return `${previous}.${String(current)}`
  }, '')

  return `${chalk.cyan(result)}`
}
