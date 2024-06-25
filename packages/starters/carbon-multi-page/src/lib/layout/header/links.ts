import type { ExternalLink } from '@magidoc/plugin-starter-variables'
import {
  Blog,
  Carbon,
  Launch,
  LogoDiscord,
  LogoFacebook,
  LogoGithub,
  LogoInstagram,
  LogoLinkedin,
  LogoMedium,
  LogoSlack,
  LogoTumblr,
  LogoTwitter,
  LogoYoutube,
  Play,
} from 'carbon-icons-svelte'

export function computeIcon(link: ExternalLink) {
  const lowerKind = link.kind?.toLocaleLowerCase() || link.label.toLocaleLowerCase()

  if (lowerKind.includes('github')) return LogoGithub
  if (lowerKind.includes('linkedin')) return LogoLinkedin
  if (lowerKind.includes('twitter')) return LogoTwitter
  if (lowerKind.includes('tumblr')) return LogoTumblr
  if (lowerKind.includes('instagram')) return LogoInstagram
  if (lowerKind.includes('facebook')) return LogoFacebook
  if (lowerKind.includes('youtube')) return LogoYoutube
  if (lowerKind.includes('discord')) return LogoDiscord
  if (lowerKind.includes('medium')) return LogoMedium
  if (lowerKind.includes('slack')) return LogoSlack
  if (lowerKind.includes('article') || lowerKind.includes('blog')) return Blog
  if (lowerKind.includes('carbon')) return Carbon
  if (
    lowerKind.includes('playground') ||
    lowerKind.includes('graphiql') ||
    lowerKind.includes('demo') ||
    lowerKind.includes('demonstration')
  ) {
    return Play
  }

  return Launch
}
