export type WebsitePreviousOrNextPage = {
  title: string
  section?: string
  href: string
}

export type WebsitePage = {
  type: 'page'
  title: string
  section?: string
  deprecated?: boolean
  href: string
  content?: string
  previous?: WebsitePreviousOrNextPage
  next?: WebsitePreviousOrNextPage
}

export type WebsiteSubMenu = {
  type: 'menu'
  title: string
  children: WebsiteTree[]
}

export type WebsiteTree = WebsitePage | WebsiteSubMenu
