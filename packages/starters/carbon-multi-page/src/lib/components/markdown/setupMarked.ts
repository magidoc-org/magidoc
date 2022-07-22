import {
  extensions,
  type TokenExtractionParameters,
} from '@magidoc/plugin-svelte-marked'
import { marked } from 'marked'
import { parseNotification } from './containers/notification/Notification'
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
            default:
              return null
          }
        }),
      ],
    })
  }
}
