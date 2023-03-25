import { loadMarkdownPagesTree, type MarkdownPage } from '../../src/utils/pages'
import path from 'path'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

describe('importing markdown file tree', () => {
  describe('importing an invalid markdown extension', () => {
    it('should fail with an error', () => {
      expect(() => loadDirectory('invalid-extension')).toThrowError(
        'Files must follow the format: <number>.<title>.md',
      )
    })
  })

  describe('importing a page with an invalid number', () => {
    it('should fail with an error', () => {
      expect(() => loadDirectory('invalid-number')).toThrowError(
        'File and directory names must start with a number.',
      )
    })
  })

  describe('importing valid pages', () => {
    it('should load the page tree properly', () => {
      expect(loadDirectory('valid')).toEqual([
        {
          title: 'First.Page',
          content: '# First page',
        },
        {
          title: 'Sub.Directory',
          content: [
            {
              title: 'Sub-File',
              content: '# Sub-File',
            },
            {
              title: 'Second Sub-File',
              content: '# Second Sub-File',
            },
          ],
        },
        {
          title: 'Third Page',
          content: '# Third page',
        },
      ])
    })
  })
})

function loadDirectory(name: string): MarkdownPage[] {
  return loadMarkdownPagesTree(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'pages', name),
  )
}
