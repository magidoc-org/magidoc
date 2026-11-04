import assert from 'node:assert/strict'
import path from 'node:path'
import { after, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const virtualPrefix = '\0magidoc-search-test:'

const modules = {
  [`${virtualPrefix}graphql`]: `
    export function index() {
      return { search: () => [] }
    }
  `,
  [`${virtualPrefix}markdown`]: `
    export function setupMarkedExtensions() {}
  `,
  [`${virtualPrefix}model`]: `
    export const schema = {}
    export function isModelEmpty() {
      return true
    }
  `,
  [`${virtualPrefix}pages`]: `
    export const pages = [{
      type: 'page',
      title: 'Welcome',
      href: '/welcome',
      content: ['# Welcome', '', 'We test search while typing.'].join('\\n'),
    }]
  `,
}

const server = await createServer({
  root,
  configFile: false,
  logLevel: 'silent',
  appType: 'custom',
  oxc: {
    tsconfig: false,
  },
  resolve: {
    alias: {
      '@magidoc/plugin-fuse-markdown': path.resolve(root, '../../plugins/fuse-markdown/src/index.ts'),
    },
  },
  server: {
    middlewareMode: true,
  },
  plugins: [
    {
      name: 'magidoc-search-test-stubs',
      enforce: 'pre',
      resolveId(id, importer) {
        if (id === '@magidoc/plugin-fuse-graphql') return `${virtualPrefix}graphql`
        if (!importer?.endsWith('/src/lib/search.ts')) return undefined
        if (id === './markdown') return `${virtualPrefix}markdown`
        if (id === './model') return `${virtualPrefix}model`
        if (id === './pages') return `${virtualPrefix}pages`
        return undefined
      },
      load(id) {
        return modules[id]
      },
    },
  ],
})

after(() => server.close())

const { search } = await server.ssrLoadModule('/src/lib/search.ts')

test('search returns displayable markdown matches for a complete query', () => {
  const results = search('welcome')

  assert.equal(results[0].type, 'markdown')
  assert.ok(Array.isArray(results[0].matches[0].indices))
})

test('search returns no results before the user enters a query', () => {
  assert.deepEqual(search(''), [])
  assert.deepEqual(search('   '), [])
})
