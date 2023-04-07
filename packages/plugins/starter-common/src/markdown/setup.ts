import { marked } from 'marked'

export function setupMarked(
  extensions?: Parameters<typeof marked.use>[0]['extensions'],
) {
  marked.use({
    gfm: true,
    headerIds: true,
    mangle: false,
    breaks: false,
    sanitize: false,
    silent: false,
    smartLists: true,
    smartypants: false,
    extensions,
  })
}
