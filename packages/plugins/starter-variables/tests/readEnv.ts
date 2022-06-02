import path from 'path'
import { fileURLToPath } from 'url'
import { readEnvFile, templates, magidoc } from '../src'

describe('reading an env file', () => {
  describe('file does not exists', () => {
    it('returns an empty object', () => {
      expect(readEnvFile('./.whatever')).toEqual({})
    })
  })

  describe('file exists', () => {
    it('parses properly', () => {
      expect(readEnvFile(exampleFile('.env'))).toEqual({
        VITE_MAGIDOC_GENERATE: 'true',
        VITE_APP_LOGO: '/some-icon.png',
        VITE_PAGES:
          '[{"title": "Potato", content: "# Some content\n\nAnd some here too"}, {"title": "Potato", content: [{"title": "This is a test", content: "wow\nthe hell"}]}]',
      })

      it('is possible to use the variables to get a well typed value', () => {
        const result = readEnvFile(exampleFile('.env'))

        expect(magidoc.MAGIDOC_GENERATE.vite.get(result)).toBe(true)
        expect(templates.APP_LOGO.vite.get(result)).toBe('/some-icon.png')
        expect(templates.PAGES).toEqual([
          { title: 'Potato', content: '# Some content\n\nAnd some here too' },
          {
            title: 'Potato',
            content: [{ title: 'This is a test', content: 'wow\nthe hell' }],
          },
        ])
      })
    })
  })
})

function exampleFile(name: string): string {
  return path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'example',
    'env',
    name,
  )
}
