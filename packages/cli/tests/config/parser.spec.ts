import { min } from 'lodash'
import type { MagidocConfiguration } from '../../src'
import { parseConfiguration } from '../../src/config/parser'
import type {
  IntrospectionConfiguration,
  WebsiteConfiguration,
} from '../../src/config/types'
import { resolve } from 'path'

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

    describe('using a file', () => {
      const introspection: IntrospectionConfiguration = {
        type: 'file',
        location: 'test/_schema.json',
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
              location: resolve(introspection.location),
            },
            website: websitePart,
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
                location: '',
              },
            },
            [
              "String must contain at least 1 character(s) at path 'introspection.location'",
            ],
          )
        })
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
      shouldFailParsing(
        {
          ...minimalConfiguration,
          introspection: {
            type: 'hmm',
          },
        },
        [
          "Invalid discriminator value. Expected 'url' | 'sdl' | 'file' | 'raw' at path 'introspection.type'",
        ],
      )
    })
  })

  describe('using different website configurations', () => {
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
            "Invalid enum value. Expected 'carbon-multi-page', received 'abc' at path 'website.template'",
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
            "Expected: ''carbon-multi-page'' but received 'number' at path 'website.template'",
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
})

function shouldParse(
  input: RecursivePartial<MagidocConfiguration>,
  expected: MagidocConfiguration,
) {
  expect(parseConfiguration(input)).toEqual(expected)
}

function shouldFailParsing(input: unknown, errors: string[]) {
  try {
    expect(parseConfiguration(input))
  } catch (error) {
    expect(error).toBeInstanceOf(Error)

    const castedError = error as Error

    const lines = castedError.message.split('\n').map(removeColors)

    // First line's message
    expect(lines[0]).toMatch(
      /^\d+ issues? found with the Magidoc configuration provided:$/,
    )

    // All error messages present are there
    expect(lines).toHaveLength(errors.length + 1)

    // All error messages are included
    expect(lines.slice(1)).toSatisfyAny((line: string) =>
      errors.some((expected) => line.includes(expected)),
    )

    // Indentation is good and the bullet used by indentation is good
    expect(lines.slice(1)).toSatisfyAll((line: string) => {
      const indent = countIndent(line)
      if (indent === 2) return getBulletChar(line) === '‣'
      if (indent === 4) return getBulletChar(line) === '-'

      console.error(`Invalid indent: ${indent} for line ${line}`)
      return false
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

function removeColors(input: string): string {
  return input
    .replaceAll('\u001b[31m', '')
    .replaceAll('\u001b[36m', '')
    .replaceAll('\u001b[33m', '')
    .replaceAll('\u001b[0m', '')
}
