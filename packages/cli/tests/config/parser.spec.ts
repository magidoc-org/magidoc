import type { MagidocConfiguration } from '../../src'
import { parseConfiguration } from '../../src/config/parser'
import type {
  DevConfiguration,
  IntrospectionConfiguration,
  WebsiteConfiguration,
} from '../../src/config/types'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url'
import { describe, it, expect } from 'vitest'

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

describe('parsing the magidoc config', () => {
  const minimalConfiguration = {
    introspection: {
      type: 'url',
      url: 'https://test.com/graphql',
    },
    website: {
      template: 'carbon-multi-page',
    },
  } as const

  describe('using minimal configuration', () => {
    it('should parse the right config', () => {
      // If this test fails and you have to update the minimal documentation,
      // make sure to update the get-started documentation associated to it
      shouldParse(minimalConfiguration, {
        introspection: {
          ...minimalConfiguration.introspection,
          method: 'POST',
        },
        website: {
          ...minimalConfiguration.website,
          templateVersion: expect.any(String) as string,
          options: {},
          output: resolve('./docs'),
        },
        dev: {
          watch: [],
        },
      })
    })
  })

  describe('using different introspections', () => {
    const websitePart: WebsiteConfiguration = {
      ...minimalConfiguration.website,
      templateVersion: expect.any(String) as string,
      options: {},
      output: expect.any(String) as string,
    }

    const devPart: DevConfiguration = {
      watch: [],
    }

    describe('using URL', () => {
      const introspection: IntrospectionConfiguration = {
        type: 'url',
        url: 'https://test.com/graphql',
        query: 'custom-query',
        method: 'GET',
        headers: {
          Test: 'some-header',
        },
      }

      it('should parse', () => {
        shouldParse(
          {
            ...minimalConfiguration,
            introspection,
          },
          {
            introspection: introspection,
            website: websitePart,
            dev: devPart,
          },
        )
      })
    })

    describe('using SDL', () => {
      const introspection: IntrospectionConfiguration = {
        type: 'sdl',
        paths: ['some-path/**/*.graphqls'],
      }

      it('should parse', () => {
        shouldParse(
          {
            ...minimalConfiguration,
            introspection,
          },
          {
            introspection: {
              ...introspection,
              paths: introspection.paths.map((path: string) =>
                resolve(path),
              ) as unknown as [string, ...string[]],
            },
            website: websitePart,
            dev: devPart,
          },
        )
      })

      describe('using an empty paths array', () => {
        it('should fail parsing', () => {
          shouldFailParsing(
            {
              ...minimalConfiguration,
              introspection: {
                ...introspection,
                paths: [],
              },
            },
            [
              "Array must contain at least 1 element(s) at path 'introspection.paths'",
            ],
          )
        })
      })
    })

    describe('using a none', () => {
      const introspection: IntrospectionConfiguration = {
        type: 'none',
      }

      it('should parse', () => {
        shouldParse(
          {
            ...minimalConfiguration,
            introspection,
          },
          {
            introspection: {
              ...introspection,
            },
            website: websitePart,
            dev: devPart,
          },
        )
      })
    })

    describe('using a raw schema', () => {
      const introspection: IntrospectionConfiguration = {
        type: 'raw',
        content: '{__schema: {}}',
      }

      it('should parse', () => {
        shouldParse(
          {
            ...minimalConfiguration,
            introspection,
          },
          {
            introspection,
            website: websitePart,
            dev: devPart,
          },
        )
      })

      describe('using an empty path', () => {
        it('should fail parsing', () => {
          shouldFailParsing(
            {
              ...minimalConfiguration,
              introspection: {
                ...introspection,
                content: '',
              },
            },
            [
              "String must contain at least 1 character(s) at path 'introspection.content'",
            ],
          )
        })
      })
    })

    describe('using an invalid type', () => {
      it('should fail parsing', () => {
        shouldFailParsing(
          {
            ...minimalConfiguration,
            introspection: {
              type: 'hmm',
            },
          },
          [
            "Invalid discriminator value. Expected 'url' | 'sdl' | 'raw' | 'none' at path 'introspection.type'",
          ],
        )
      })
    })
  })

  describe('using different website configurations', () => {
    const devPart: DevConfiguration = {
      watch: [],
    }

    describe('using an invalid template', () => {
      it('should fail parsing', () => {
        shouldFailParsing(
          {
            ...minimalConfiguration,
            website: {
              template: 'abc',
            },
          },
          [
            "Template should be either a valid template name among [carbon-multi-page] or a path to a Magidoc template directory at path 'website.template'",
          ],
        )
      })
    })

    describe('using a valid directory path as template', () => {
      it('should parse properly', () => {
        shouldParse(
          {
            ...minimalConfiguration,
            website: {
              template: getPath('template-directory'),
            },
          },
          {
            introspection: {
              ...minimalConfiguration.introspection,
              method: 'POST',
            },
            website: {
              ...minimalConfiguration.website,
              template: getPath('template-directory'),
              templateVersion: expect.any(String) as string,
              options: {},
              output: resolve('./docs'),
            },
            dev: devPart,
          },
        )
      })
    })

    describe('using an invalid directory path as template', () => {
      it('should fail parsing too', () => {
        shouldFailParsing(
          {
            ...minimalConfiguration,
            website: {
              template: getPath('template-file'),
            },
          },
          [
            "Template should be either a valid template name among [carbon-multi-page] or a path to a Magidoc template directory at path 'website.template'",
          ],
        )
      })
    })

    describe('using a wrong input type', () => {
      it('should fail parsing', () => {
        shouldFailParsing(
          {
            ...minimalConfiguration,
            website: {
              template: 123,
            },
          },
          [
            "Expected: 'string' but received 'number' at path 'website.template'",
          ],
        )
      })
    })

    describe('using options', () => {
      it('should parse', () => {
        const options = {
          siteRoot: '/abc',
          siteMeta: { lol: 'abc' },
          appLogo: 'https://lol.com',
          appTitle: 'Magidoc-test',
          queryGenerationFactories: {
            Test: 'abc',
            OddNumber: 123,
          },
          pages: [
            {
              title: 'Test',
              content: '# this is some markdown',
            },
            {
              title: 'Another test',
              content: [
                {
                  title: 'Deep thing',
                  content: '# this is some other markdown [with](a-link.com)',
                },
              ],
            },
          ],
        }

        shouldParse(
          {
            ...minimalConfiguration,
            website: {
              ...minimalConfiguration.website,
              options,
            },
          },
          {
            introspection: {
              ...minimalConfiguration.introspection,
              method: 'POST',
            },
            website: {
              ...minimalConfiguration.website,
              templateVersion: expect.any(String) as string,
              options: options,
              output: resolve('./docs'),
            },
            dev: devPart,
          },
        )
      })

      describe('using invalid option values', () => {
        it('should not parse', () => {
          const options = {
            invalidOption: 'lol',
            siteRoot: 123,
            siteMeta: { lol: 123 },
            appLogo: '',
            appTitle: 'Magidoc-test',
            queryGenerationFactories: {
              Test: 'abc',
              OddNumber: 123,
            },
            pages: [
              {
                title: '',
                content: 234,
              },
              {
                title: 'Another test',
                content: [
                  {
                    title: 'Deep thing',
                    content: '# this is some other markdown [with](a-link.com)',
                  },
                ],
              },
            ],
          }

          shouldFailParsing(
            {
              ...minimalConfiguration,
              website: {
                ...minimalConfiguration.website,
                options,
              },
            },
            [
              "‣ No option available with name 'invalidOption' at path 'website.options.invalidOption'",
              "‣ Expected: 'string' but received 'number' at path 'website.options.siteRoot'",
              "‣ Expected: 'string' but received 'number' at path 'website.options.siteMeta.lol'",
              "‣ String must contain at least 1 character(s) at path 'website.options.pages[0].title'",
              "‣ Invalid input at path 'website.options.pages[0].content':",
              '- Expected array, received number',
              '- Expected string, received number',
            ],
          )
        })
      })
    })
  })

  describe('using different dev configurations', () => {
    describe('using an invalid configuration', () => {
      const invalidConfiguration = {
        ...minimalConfiguration,
        dev: {
          watch: [123],
        },
      } as const

      it('should fail parsing', () => {
        shouldFailParsing(invalidConfiguration, [
          "Expected: 'string' but received 'number' at path 'dev.watch[0]'",
        ])
      })
    })

    describe('using valid configuration', () => {
      const valid: RecursivePartial<MagidocConfiguration> = {
        ...minimalConfiguration,
        dev: {
          watch: ['./test', './test/**'],
        },
      }

      it('should parse properly', () => {
        shouldParse(valid, {
          introspection: {
            ...minimalConfiguration.introspection,
            method: 'POST',
          },
          website: {
            ...minimalConfiguration.website,
            templateVersion: expect.any(String) as string,
            options: {},
            output: resolve('./docs'),
          },
          dev: {
            watch: (valid.dev?.watch || []).map((target) =>
              path.resolve(target || ''),
            ),
          },
        })
      })
    })
  })
})

function shouldParse(
  input: RecursivePartial<MagidocConfiguration>,
  expected: MagidocConfiguration,
) {
  expect(parseConfiguration(input)).toEqual(expected)
}

function shouldFailParsing(input: unknown, errors: string[]) {
  try {
    parseConfiguration(input)
    throw 'should-not-get-here'
  } catch (error) {
    expect(error).toBeInstanceOf(Error)

    const castedError = error as Error

    const lines = castedError.message.split('\n').map(removeAnsiColors)

    // First line's message
    expect(lines[0]).toMatch(
      /^\d+ issues? found with the Magidoc configuration provided:$/,
    )

    // All error messages present are there
    expect(lines).toHaveLength(errors.length + 1)

    // All error messages are included
    lines.slice(1).forEach((line: string) => {
      expect(line).toSatisfy(() =>
        errors.some((expected) => line.includes(expected)),
      )
    })

    // Indentation is good and the bullet used by indentation is good
    lines.slice(1).forEach((line: string) => {
      expect(line).toSatisfy(() => {
        const indent = countIndent(line)
        if (indent === 2) return getBulletChar(line) === '‣'
        if (indent === 4) return getBulletChar(line) === '-'

        console.error(`Invalid indent: ${indent} for line ${line}`)
        return false
      })
    })
  }
}

function countIndent(input: string): number {
  const groups = /^(\s*)/g.exec(input)
  if (!groups) return 0
  return groups[1]?.length ?? 0
}

function getBulletChar(input: string): string {
  return input.trim()[0] ?? ''
}

function getPath(name: string): string {
  return path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'examples',
    name,
  )
}
