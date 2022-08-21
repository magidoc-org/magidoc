import { beforeEach, describe, expect, it } from 'vitest'
import { index, SearchResult } from '../../src'
import { unindent } from '../utils'
import type Fuse from 'fuse.js'

describe('indexing a markdown source', () => {
  const data = {
    custom: 'data',
  }

  let fuse: Fuse<SearchResult<typeof data>>

  describe('a single page', () => {
    beforeEach(() => {
      fuse = index([
        {
          id: 'first-page',
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

    it('should include ', () => {
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
  })
})
