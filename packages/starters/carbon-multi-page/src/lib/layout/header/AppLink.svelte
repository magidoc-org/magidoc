<script lang="ts">
  import type { ExternalLink } from '@magidoc/plugin-starter-variables'
  import { HeaderPanelLink } from 'carbon-components-svelte'
  import {
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

  export let link: ExternalLink

  const lowerLabel = link.label.toLocaleLowerCase()

  function computeIcon() {
    console.log(lowerLabel)
    if (lowerLabel.includes('github')) {
      return LogoGithub
    } else if (lowerLabel.includes('linkedin')) {
      return LogoLinkedin
    } else if (lowerLabel.includes('twitter')) {
      return LogoTwitter
    } else if (lowerLabel.includes('tumblr')) {
      return LogoTumblr
    } else if (lowerLabel.includes('instagram')) {
      return LogoInstagram
    } else if (lowerLabel.includes('facebook')) {
      return LogoFacebook
    } else if (lowerLabel.includes('youtube')) {
      return LogoYoutube
    } else if (lowerLabel.includes('discord')) {
      return LogoDiscord
    } else if (lowerLabel.includes('medium')) {
      return LogoMedium
    } else if (lowerLabel.includes('slack')) {
      return LogoSlack
    } else if (
      lowerLabel.includes('playground') ||
      lowerLabel.includes('graphiql')
    ) {
      return Play
    }

    return Launch
  }

  const icon = computeIcon()
</script>

<HeaderPanelLink href={link.href}>
  <div class="container">
    <svelte:component this={icon} size="16" style="margin-right: 0.3rem" />
    {link.label}
  </div>
</HeaderPanelLink>

<style>
  .container {
    display: flex;
    align-items: center;
    height: 100%;
  }
</style>
