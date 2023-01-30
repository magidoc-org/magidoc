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
  const lowerKind =
    link.kind?.toLocaleLowerCase() || link.label.toLocaleLowerCase()

  if (lowerKind.includes('github')) {
    return LogoGithub
  } else if (lowerKind.includes('linkedin')) {
    return LogoLinkedin
  } else if (lowerKind.includes('twitter')) {
    return LogoTwitter
  } else if (lowerKind.includes('tumblr')) {
    return LogoTumblr
  } else if (lowerKind.includes('instagram')) {
    return LogoInstagram
  } else if (lowerKind.includes('facebook')) {
    return LogoFacebook
  } else if (lowerKind.includes('youtube')) {
    return LogoYoutube
  } else if (lowerKind.includes('discord')) {
    return LogoDiscord
  } else if (lowerKind.includes('medium')) {
    return LogoMedium
  } else if (lowerKind.includes('slack')) {
    return LogoSlack
  } else if (lowerKind.includes('article') || lowerKind.includes('blog')) {
    return Blog
  } else if (lowerKind.includes('carbon')) {
    return Carbon
  } else if (
    lowerKind.includes('playground') ||
    lowerKind.includes('graphiql') ||
    lowerKind.includes('demo') ||
    lowerKind.includes('demonstration')
  ) {
    return Play
  }

  return Launch
}
