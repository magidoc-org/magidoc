import { describe } from 'node:test'
import { expect } from 'vitest'
import {
  extract,
  IndexableMarkdownType,
  Options,
} from '../../src/markdown/extract'
import { defaultExtractors } from '../../src/markdown/extractors'

describe('extracting markdown into sections', () => {
  const options: Options = {
    extractors: {
      ...defaultExtractors(),
    },
  }

  describe('using headers', () => {
    describe('using a single header', () => {
      expect(extract('# Header', options)).toEqual([
        {
          type: IndexableMarkdownType.HEADER,
          path: [{ depth: 1, text: 'Header' }],
          title: 'Header',
        },
      ])
    })
  })
})
