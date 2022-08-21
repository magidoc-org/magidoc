/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces

export type WebsitePage = {
  type: 'page'
  title: string
  section?: string
  href: string
  content: string
  previous?: WebsitePreviousOrNextPage
  next?: WebsitePreviousOrNextPage
}

export type WebsitePreviousOrNextPage = {
  title: string
  section?: string
  href: string
}

export type WebsiteSubMenu = {
  type: 'menu'
  title: string
  children: WebsiteContent[]
}

export type WebsiteContent = WebsitePage | WebsiteSubMenu

declare global {
  declare namespace App {
    interface Stuff {
      readonly homeUrl: string
    }
  }
}
