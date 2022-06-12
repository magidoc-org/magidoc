<script lang="ts">
  import {
    HeaderAction,
    HeaderGlobalAction,
    HeaderPanelLink,
    HeaderPanelLinks,
  } from 'carbon-components-svelte'
  import { Launch, LogoDiscord, LogoGithub } from 'carbon-icons-svelte'
</script>

<HeaderGlobalAction aria-label={'Github'} icon={LogoGithub} />
<HeaderAction tra>
  <HeaderPanelLinks>
    <HeaderPanelLink><LogoGithub /> Github</HeaderPanelLink>
    <HeaderPanelLink><LogoDiscord /> Discord</HeaderPanelLink>
    <HeaderPanelLink><Launch /> Switcher item 2</HeaderPanelLink>
  </HeaderPanelLinks>
</HeaderAction>
