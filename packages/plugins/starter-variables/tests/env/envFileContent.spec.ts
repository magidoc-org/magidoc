import { toEnv, templates, Variable, parseEnv } from '../../src'

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
        '[{"title":"My-page-title","content":"A raw markdown string containing stuff like \\"double quotes\\", `code`, and **bold**."},{"title":"My-page-title-2","content":[{"title":"This is another page, but this one contains \'single quotes\', ```much more code```,\n new lines \n\n # And a new header apparently"}]}]',
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

    // it('is possible to convert it back to a record of strings', () => {
    //   const result = readEnv(env)

    //   console.log(result)
    //   expect(magidoc.MAGIDOC_GENERATE.vite.get(result)).toBe(true)
    //   expect(templates.APP_LOGO.vite.get(result)).toBe('/some-icon.png')
    //   expect(templates.PAGES.vite.get(result)).toEqual([
    //     {
    //       title: 'Potato',
    //       content: '# Some content\n\nAnd some here too. `lol`',
    //     },
    //     {
    //       title: 'Potato',
    //       content: [{ title: 'This is a test', content: 'wow\nthe hell' }],
    //     },
    //   ])
    // })
  })
})
