import { toEnv, templates, Variable, parseEnv, magidoc } from '../../src'

describe('writing an env ', () => {
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

    const expectedRecord = {
      VITE_MAGIDOC_GENERATE: 'true',
      VITE_APP_TITLE: 'My App',
      VITE_PAGES:
        '[{"title":"My-page-title","content":"A raw markdown string containing stuff like \\"double quotes\\", `code`, and **bold**."},{"title":"My-page-title-2","content":[{"title":"This is another page, but this one contains \'single quotes\', ```much more code```,\\n new lines \\n\\n # And a new header apparently"}]}]',
    }

    const result = toEnv(initialObject, [
      templates.APP_TITLE as Variable<unknown>,
      templates.PAGES as Variable<unknown>,
    ])

    it('converts properly', () => {
      console.log(result)
      expect(result.length).toBeGreaterThan(10)
    })

    it('parses the same content correctly', () => {
      expect(parseEnv(result)).toEqual(expectedRecord)
    })

    it('is possible to convert it back to a record of strings', () => {
      const parsed = parseEnv(result)

      expect(magidoc.MAGIDOC_GENERATE.vite.get(parsed)).toBe(true)
      expect(templates.APP_TITLE.vite.get(parsed)).toBe(initialObject.appTitle)
      expect(templates.PAGES.vite.get(parsed)).toEqual(initialObject.pages)
    })
  })
})
