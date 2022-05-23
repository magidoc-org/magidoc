import type { GraphQLSchema } from 'graphql'

/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces

type WebsitePage = {
  type: 'page'
  title: string
  section?: string
  deprecated?: boolean
  href: string
  content?: string
  previous?: WebsitePreviousOrNextPage
  next?: WebsitePreviousOrNextPage
}

type WebsitePreviousOrNextPage = {
  title: string
  section?: string
  href: string
}

type WebsiteSubMenu = {
  type: 'menu'
  title: string
  children: WebsiteContent[]
}

type WebsiteContent = WebsitePage | WebsiteSubMenu

declare global {
  declare namespace App {
    interface Stuff {
      readonly homeUrl: string

      readonly schema: GraphQLSchema
    }
  }
}
