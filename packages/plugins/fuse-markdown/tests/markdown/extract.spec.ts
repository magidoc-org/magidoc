import { beforeEach, expect, it } from 'vitest'
import {
  extract,
  IndexableMarkdownType,
  type Options,
} from '../../src/markdown/extract'
import { defaultExtractors } from '../../src/markdown/extractors'
import { describe } from 'vitest'
import Slugger from 'github-slugger'
import { unindent } from '../utils'
import { defaultLexer } from '../../src/markdown/marked'

describe('extracting markdown into sections', () => {
  let options: Options

  beforeEach(() => {
    options = {
      slugger: new Slugger(),
      lexer: defaultLexer(),
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
            type: IndexableMarkdownType.HEADER,
            path: [{ id: 'header', depth: 1, text: 'Header' }],
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
            type: 'header',
            path: [{ id: 'header-1', depth: 1, text: 'Header 1' }],
            title: 'Header 1',
          },
          {
            type: 'header',
            path: [
              { id: 'header-1', depth: 1, text: 'Header 1' },
              { id: 'header-2', depth: 2, text: 'Header 2' },
            ],
            title: 'Header 2',
          },
          {
            type: 'header',
            path: [
              { id: 'header-1', depth: 1, text: 'Header 1' },
              { id: 'header-2', depth: 2, text: 'Header 2' },
              { id: 'header-3', depth: 3, text: 'Header 3' },
            ],
            title: 'Header 3',
          },
          {
            type: 'header',
            path: [
              { id: 'header-1', depth: 1, text: 'Header 1' },
              { id: 'header-2', depth: 2, text: 'Header 2' },
              { id: 'header-3', depth: 3, text: 'Header 3' },
              { id: 'header-4', depth: 4, text: 'Header 4' },
            ],
            title: 'Header 4',
          },
          {
            type: 'header',
            path: [
              { id: 'header-1', depth: 1, text: 'Header 1' },
              { id: 'header-2-1', depth: 2, text: 'Header 2' },
            ],
            title: 'Header 2',
          },
          {
            type: 'header',
            path: [
              { id: 'header-1', depth: 1, text: 'Header 1' },
              { id: 'header-2-1', depth: 2, text: 'Header 2' },
              { id: 'header-3-again', depth: 3, text: 'Header 3 again' },
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
            type: IndexableMarkdownType.HEADER,
            path: [{ id: 'header', depth: 1, text: 'Header' }],
            title: 'Header',
          },
          {
            type: IndexableMarkdownType.SECTION,
            content: 'Text',
            headers: [{ id: 'header', depth: 1, text: 'Header' }],
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

    it('should separate two paragraphs', () => {
      expect(
        extract(
          unindent(`
                    Paragraph 1

                    Paragraph 2
                `),
          options,
        ),
      ).toEqual([
        {
          type: IndexableMarkdownType.SECTION,
          content: 'Paragraph 1\nParagraph 2',
          headers: [],
        },
      ])
    })
  })

  describe('using a link alone', () => {
    it('should return the link text', () => {
      expect(
        extract(
          unindent(`
                [some link](http://example.com)
            `),
          options,
        ),
      ).toEqual([
        {
          type: IndexableMarkdownType.SECTION,
          content: 'some link',
          headers: [],
        },
      ])
    })
  })

  describe('using bold text', () => {
    it('should return the text', () => {
      expect(
        extract(
          unindent(`
                **Bold text**
            `),
          options,
        ),
      ).toEqual([
        {
          type: IndexableMarkdownType.SECTION,
          content: 'Bold text',
          headers: [],
        },
      ])
    })
  })

  describe('using italic text', () => {
    it('should return the text', () => {
      expect(
        extract(
          unindent(`
                *Italic text*
            `),
          options,
        ),
      ).toEqual([
        {
          type: IndexableMarkdownType.SECTION,
          content: 'Italic text',
          headers: [],
        },
      ])
    })
  })

  describe('using a code span', () => {
    it('should return the text', () => {
      expect(
        extract(
          unindent(`
                \`this is a codespan\`
            `),
          options,
        ),
      ).toEqual([
        {
          type: IndexableMarkdownType.SECTION,
          content: 'this is a codespan',
          headers: [],
        },
      ])
    })
  })

  describe('using a blockquote', () => {
    it('should return the text', () => {
      expect(
        extract(
          unindent(`
                > This is **what** I have [inside](http://example.com)
            `),
          options,
        ),
      ).toEqual([
        {
          type: IndexableMarkdownType.SECTION,
          content: 'This is what I have inside',
          headers: [],
        },
      ])
    })
  })

  describe('using a list', () => {
    it('should return the text', () => {
      expect(
        extract(
          unindent(`
                - Item 1
                - Item 2
            `),
          options,
        ),
      ).toEqual([
        {
          type: IndexableMarkdownType.SECTION,
          content: '\nItem 1\nItem 2',
          headers: [],
        },
      ])
    })

    it('should return the text with inner markdown', () => {
      expect(
        extract(
          unindent(`
                - [Item 1](http://example.com)
                - **Item 2**
            `),
          options,
        ),
      ).toEqual([
        {
          type: IndexableMarkdownType.SECTION,
          content: '\nItem 1\nItem 2',
          headers: [],
        },
      ])
    })
  })

  describe('using a table', () => {
    it('should return only the content of the rows', () => {
      expect(
        extract(
          unindent(`
                | Header 1 | Header 2 |
                | -------- | -------- |
                | Item 1   | Item 2   |
                | Item 3   | Item 4   |
            `),
          options,
        ),
      ).toEqual([
        {
          type: IndexableMarkdownType.SECTION,
          content: '\nItem 1 Item 2\nItem 3 Item 4',
          headers: [],
        },
      ])
    })

    it('should return only the content of the rows even with inner markdown', () => {
      expect(
        extract(
          unindent(`
                | Header 1                       | Header 2     |
                | ------------------------------ | ------------ |
                | [Item 1](https://google.com)   | Item 2       |
                | Item 3                         | **Item 4**   |
            `),
          options,
        ),
      ).toEqual([
        {
          type: IndexableMarkdownType.SECTION,
          content: '\nItem 1 Item 2\nItem 3 Item 4',
          headers: [],
        },
      ])
    })
  })
})
