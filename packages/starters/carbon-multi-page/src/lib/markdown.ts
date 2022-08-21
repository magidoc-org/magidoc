import {
  extensions,
  type TokenExtractionParameters,
} from '@magidoc/plugin-svelte-marked'
import { marked } from 'marked'
import { parseNotification } from './components/markdown/containers/notification/Notification'
import { parseTabs } from './components/markdown/containers/tabs/Tabs'
import { parseTags } from './components/markdown/containers/tags/Tags'

export function setupMarkedExtensions() {
  marked.use({
    gfm: true,
    headerIds: true,
    mangle: false,
    breaks: false,
    sanitize: false,
    silent: false,
    smartLists: true,
    smartypants: false,
    extensions: [
      extensions.containerExtension((params: TokenExtractionParameters) => {
        switch (params.type) {
          case 'notification':
            return parseNotification(params)
          case 'tags':
            return parseTags(params)
          case 'tabs':
            return parseTabs(params)
          default:
            return null
        }
      }),
    ],
  })
}
