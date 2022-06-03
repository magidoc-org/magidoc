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
      console.log(readEnvFile(exampleFile('.env')))
      expect(readEnvFile(exampleFile('test-env'))).toEqual({
        VITE_MAGIDOC_GENERATE: 'true',
        VITE_APP_LOGO: '/some-icon.png',
        VITE_PAGES:
          '[{"title": "Potato", "content": "# Some content\\n\\nAnd some here too"}, {"title": "Potato", "content": [{"title": "This is a test", "content": "wow\\nthe hell"}]}]',
      })
    })

    it('is possible to use the variables to get a well typed value', () => {
      const result = readEnvFile(exampleFile('test-env'))

      console.log(result)
      expect(magidoc.MAGIDOC_GENERATE.vite.get(result)).toBe(true)
      expect(templates.APP_LOGO.vite.get(result)).toBe('/some-icon.png')
      expect(templates.PAGES.vite.get(result)).toEqual([
        { title: 'Potato', content: '# Some content\n\nAnd some here too' },
        {
          title: 'Potato',
          content: [{ title: 'This is a test', content: 'wow\nthe hell' }],
        },
      ])
    })
  })
})

function exampleFile(name: string): string {
  return path.join(__dirname, 'example', 'env', name)
}
