import { MagidocConfiguration, ZMagidocConfiguration } from './types'
import { templates } from '@magidoc/plugin-starter-variables'
import _ from 'lodash'
import z, { ZodIssue, ZodType } from 'zod'
import { cyan, red } from '../commands/utils/outputColors'

export function parseConfiguration(content: unknown): MagidocConfiguration {
  const result = ZMagidocConfiguration.safeParse(content)
  if (result.success) {
    validateOptions(result.data.website.options)
    return result.data
  }

  throwConfigurationError(result.error.issues)
}

function validateOptions(options: Record<string, unknown>): void | never {
  const allOptionsByName = _.keyBy(Object.values(templates), (template) =>
    String(template.name),
  )
  let issues: ZodIssue[] = []
  _.forEach(options, (value, key) => {
    const variable = allOptionsByName[key]
    const path: (string | number)[] = ['website', 'options', key]
    if (!variable) {
      issues.push({
        message: `No option available with name: ${key}`,
        code: 'custom',
        path,
      })
      return
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const zodType = variable.zod.type(z) as unknown as ZodType<unknown>
    const result = zodType.safeParse(value)
    if (!result.success) {
      issues = issues.concat(
        result.error.issues.map((issue) => ({
          ...issue,
          path: path.concat(issue.path),
        })),
      )
    }
  })

  if (issues.length > 0) {
    throwConfigurationError(issues)
  }
}

function throwConfigurationError(issues: ZodIssue[]): never {
  const formattedIssues = convertZodIssues(issues)
  const pluralIssue = issues.length > 1 ? 'issues' : 'issue'
  const issuesText = red(`${issues.length} ${pluralIssue}`)
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

  return `${cyan(result)}`
}

function convertZodIssues(issues: ZodIssue[]): string[] {
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
