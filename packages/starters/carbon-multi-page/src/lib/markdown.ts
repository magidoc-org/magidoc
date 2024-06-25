import { type TokenExtractionParameters, extensions } from '@magidoc/plugin-svelte-marked'
import { marked } from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import { parseNotification } from './components/markdown/containers/notification/Notification'
import { parseTabs } from './components/markdown/containers/tabs/Tabs'
import { parseTags } from './components/markdown/containers/tags/Tags'

export function setupMarkedExtensions() {
  marked.use(gfmHeadingId())

  marked.use({
    gfm: true,
    breaks: false,
    silent: false,
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
