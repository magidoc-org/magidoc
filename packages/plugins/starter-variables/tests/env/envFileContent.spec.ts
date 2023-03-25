import { templates, magidoc, toVariablesFile } from '../../src'
import type { Variable } from '../../src'
import { UnsupportedVariablesError } from '../../src/env/envFileContent'
import { describe, expect, it } from 'vitest'

describe('creating a variables file ', () => {
  const initialObject = {
    appTitle: 'My App',
    pages: [
      {
        title: 'My-page-title',
        content:
          'A raw markdown string containing stuff like "double quotes", `code`, and **bold**.',
      },
      {
        title: 'My-page-title-2',
        content: [
          {
            title:
              "This is another page, but this one contains 'single quotes', ```much more code```,\n new lines \n\n # And a new header apparently",
          },
        ],
      },
    ],
  }

  describe('all provided options are supported', () => {
    const result = toVariablesFile(initialObject, [
      templates.APP_TITLE as Variable<unknown>,
      templates.PAGES as Variable<unknown>,
    ])

    it('is possible to convert it back to the original object using variables', () => {
      const parsed = JSON.parse(result) as Record<string, string>

      expect(magidoc.MAGIDOC_GENERATE.get(parsed)).toBe(true)
      expect(templates.APP_TITLE.get(parsed)).toBe(initialObject.appTitle)
      expect(templates.PAGES.get(parsed)).toEqual(initialObject.pages)
    })
  })

  describe('some of the options are unsupported', () => {
    it('raises an error', () => {
      expect.assertions(2)

      try {
        toVariablesFile(initialObject, [])
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedVariablesError)
        expect(
          (error as UnsupportedVariablesError).unsupportedVariables,
        ).toEqual(['appTitle', 'pages'])
      }
    })
  })
})
