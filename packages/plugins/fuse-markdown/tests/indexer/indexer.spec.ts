import { beforeEach, describe, expect, it } from 'vitest'
import { index, SearchResult } from '../../src'
import { unindent } from '../utils'
import type Fuse from 'fuse.js'

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
          id: 'first-page',
          path: [{ depth: 1, text: 'First Page' }],
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

  describe('a complex markdown', () => {})
})

function loadPages(): {
    
}