import { beforeEach, describe, expect, it } from 'vitest'
import { index, type MarkdownDocument, type SearchResult } from '../../src'
import { unindent } from '../utils'
import type Fuse from 'fuse.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

describe('indexing a markdown source', () => {
  describe('a single page', () => {
    const data = {
      custom: 'data',
    }

    let fuse: Fuse<SearchResult<typeof data>>

    beforeEach(() => {
      fuse = index([
        {
          data: data,
          content: unindent(`
              # First Page
              With some text
            `),
        },
      ])
    })

    it('should search ignoring case', () => {
      const result = fuse.search('first')
      expect(result).toHaveLength(1)
      const firstResult = result[0]
      expect(firstResult.item).toEqual({
        data: data,
        part: {
          path: [{ id: 'first-page', depth: 1, text: 'First Page' }],
          title: 'First Page',
          type: 'header',
        },
      })
    })

    it('should include search indexes', () => {
      const result = fuse.search('first')
      expect(result).toHaveLength(1)
      const firstResult = result[0]
      expect(firstResult.matches).toEqual([
        {
          indices: [[0, 4]],
          key: 'part.title',
          value: 'First Page',
        },
      ])
    })

    it('should include score', () => {
      const result = fuse.search('first')
      expect(result).toHaveLength(1)
      const firstResult = result[0]
      expect(firstResult.score).toBeGreaterThan(0)
      expect(firstResult.score).toBeLessThan(1.0)
    })
  })

  describe('a complex markdown', () => {
    const pages = loadPages()

    let fuse: Fuse<
      SearchResult<{
        name: 'first' | 'second'
      }>
    >

    beforeEach(() => {
      fuse = index(pages)
    })

    it('should index text properly', () => {
      const result = fuse.search(
        'This is a sample page that contains some very important text.',
      )
      expect(result).toHaveLength(1)
      const firstResult = result[0]
      expect(firstResult.item).toEqual({
        data: {
          name: 'first',
        },
        part: {
          type: 'section',
          content:
            'This is a sample page that contains some very important text. It is meant to be used as a test page in a unit test, making sure that the indexer is working properly. ',
          headers: [
            {
              id: 'first-page',
              depth: 1,
              text: 'First page',
            },
          ],
        },
      })
    })

    it('should index headers properly', () => {
      const result = fuse.search('Remaining features')
      expect(result.length).toBeGreaterThanOrEqual(1)
      expect(result.length).toBeLessThanOrEqual(4)
      expect(result.map((it) => it.item)).toContainEqual({
        data: {
          name: 'second',
        },
        part: {
          type: 'header',
          title: 'Remaining features',
          path: [
            {
              id: 'second-page',
              depth: 1,
              text: 'Second page',
            },
            {
              id: 'remaining-features',
              depth: 2,
              text: 'Remaining features',
            },
          ],
        },
      })
    })

    it('should provide search results with few characters in the search', () => {
      const result = fuse.search('feature')
      expect(result.length).toBeGreaterThan(1) // At least 2
      expect(result.length).toBeLessThanOrEqual(4) // At most 4
    })

    it('should not index images', () => {
      const result = fuse.search('This image right here')
      expect(result).toHaveLength(0)
    })

    it('should not index images', () => {
      const result = fuse.search('This image right here')
      expect(result).toHaveLength(0)
    })

    it('should not index code blocks', () => {
      const result = fuse.search('This code should not be indexed at all')
      expect(result).toHaveLength(0)
    })

    it('should not index html', () => {
      const result = fuse.search('it is not possible to index HTML')
      expect(result).toHaveLength(0)
    })
  })
})

function loadPages(): MarkdownDocument<{
  name: 'first' | 'second'
}>[] {
  const __dirname = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'pages',
  )
  return [
    {
      data: { name: 'first' },
      content: readFileSync(path.join(__dirname, 'first.md'), 'utf8'),
    },
    {
      data: { name: 'second' },
      content: readFileSync(path.join(__dirname, 'second.md'), 'utf8'),
    },
  ]
}
