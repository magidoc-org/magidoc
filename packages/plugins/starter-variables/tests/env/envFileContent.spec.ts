import { templates, Variable, magidoc, toVariablesFile } from '../../src'

describe('creating a variables file ', () => {
  describe('all provided options are supported', () => {
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
})
