import type { GraphQLSchema } from 'graphql'

/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces

type CustomPage = {
  type: 'page'
  title: string
  href: string
  content: string
}

type CustomSubMenu = {
  type: 'menu'
  title: string
  children: CustomContent[]
}

type CustomContent = CustomPage | CustomSubMenu

declare global {
  declare namespace App {
    interface Stuff {
      readonly homeUrl: string

      readonly schema: GraphQLSchema

      readonly content: CustomContent[]
    }
  }
}
