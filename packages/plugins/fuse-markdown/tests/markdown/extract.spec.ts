import { beforeEach, expect, it } from 'vitest'
import {
  extract,
  IndexableMarkdownType,
  Options,
} from '../../src/markdown/extract'
import { defaultExtractors } from '../../src/markdown/extractors'
import { describe } from 'vitest'
import { Slugger } from 'marked'

describe('extracting markdown into sections', () => {
  let options: Options

  beforeEach(() => {
    options = {
      slugger: new Slugger(),
      extractors: {
        ...defaultExtractors(),
      },
    }
  })

  describe('empty markdown', () => {
    it('should return empty parts', () => {
      expect(extract('', options)).toEqual([])
    })
  })

  describe('using headers', () => {
    describe('using a single header', () => {
      it('should extract the header', () => {
        expect(extract('# Header', options)).toEqual([
          {
            id: 'header',
            type: IndexableMarkdownType.HEADER,
            path: [{ depth: 1, text: 'Header' }],
            title: 'Header',
          },
        ])
      })
    })

    describe('using a series of differently layered headers', () => {
      it('should extract the headers', () => {
        expect(
          extract(
            unindent(`
            # Header 1 
            ## Header 2
            ### Header 3
            #### Header 4
            ## Header 2
            ### Header 3 again
          `),
            options,
          ),
        ).toEqual([
          {
            id: 'header-1',
            type: 'header',
            path: [{ depth: 1, text: 'Header 1' }],
            title: 'Header 1',
          },
          {
            id: 'header-2',
            type: 'header',
            path: [
              { depth: 1, text: 'Header 1' },
              { depth: 2, text: 'Header 2' },
            ],
            title: 'Header 2',
          },
          {
            id: 'header-3',
            type: 'header',
            path: [
              { depth: 1, text: 'Header 1' },
              { depth: 2, text: 'Header 2' },
              { depth: 3, text: 'Header 3' },
            ],
            title: 'Header 3',
          },
          {
            id: 'header-4',
            type: 'header',
            path: [
              { depth: 1, text: 'Header 1' },
              { depth: 2, text: 'Header 2' },
              { depth: 3, text: 'Header 3' },
              { depth: 4, text: 'Header 4' },
            ],
            title: 'Header 4',
          },
          {
            id: 'header-2-1',
            type: 'header',
            path: [
              { depth: 1, text: 'Header 1' },
              { depth: 2, text: 'Header 2' },
            ],
            title: 'Header 2',
          },
          {
            id: 'header-3-again',
            type: 'header',
            path: [
              { depth: 1, text: 'Header 1' },
              { depth: 2, text: 'Header 2' },
              { depth: 3, text: 'Header 3 again' },
            ],
            title: 'Header 3 again',
          },
        ])
      })
    })
  })

  describe('using text', () => {
    describe('with a header', () => {
      it('should return both parts', () => {
        expect(
          extract(
            unindent(`
                # Header
                Text
            `),
            options,
          ),
        ).toEqual([
          {
            id: 'header',
            type: IndexableMarkdownType.HEADER,
            path: [{ depth: 1, text: 'Header' }],
            title: 'Header',
          },
          {
            type: IndexableMarkdownType.SECTION,
            content: 'Text',
            headers: [{ depth: 1, text: 'Header' }],
          },
        ])
      })
    })

    describe('without a header', () => {
      it('should return the text only', () => {
        expect(
          extract(
            unindent(`
                    Text
                `),
            options,
          ),
        ).toEqual([
          {
            type: IndexableMarkdownType.SECTION,
            content: 'Text',
            headers: [],
          },
        ])
      })
    })
  })

  describe('using a paragraph', () => {
    it('should return the paragraph text', () => {
      expect(
        extract(
          unindent(`
                Paragraph with [link](http://example.com) inside it and other **inner markdown**.
            `),
          options,
        ),
      ).toEqual([
        {
          type: IndexableMarkdownType.SECTION,
          content: 'Paragraph with link inside it and other inner markdown.',
          headers: [],
        },
      ])
    })
  })
})

export function unindent(target: string): string {
  return target.replace(/^\s+/gm, '')
}
