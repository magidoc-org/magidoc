import {
  extensions,
  type TokenExtractionParameters,
} from '@magidoc/plugin-svelte-marked'
import { marked } from 'marked'
import { parseNotification } from './containers/notification/Notification'
import { parseTabs } from './containers/tabs/Tabs'
import { parseTags } from './containers/tags/Tags'

let initialized = false

export function setupMarkedExtensions() {
  if (!initialized) {
    initialized = true
    marked.use({
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
}
