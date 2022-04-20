import yaml from 'js-yaml'
import { FileConfiguration, ZFileConfiguration } from './types'

export function parseConfiguration(content: string): FileConfiguration {
  const response = yaml.load(content)
  const result = ZFileConfiguration.safeParse(response)

  if (result.success) {
    return result.data
  }

  const issues = result.error.issues
  const formattedIssues = issues.map(
    (issue) =>
      `  - ${issue.message} at path ${issue.path.reduce(
        (previous: string, current: string | number) => {
          if (typeof current === 'number') return previous + `[${current}]`
          return previous + String(current)
        },
        '',
      )}`,
  )

  throw new Error(
    `${
      issues.length
    } issues were found with the YAML configuration provided:\n${formattedIssues.join(
      '\n',
    )}}`,
  )
}
