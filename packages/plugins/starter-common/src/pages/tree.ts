export type NavigationPage = {
  title: string
  section?: string
  href: string
}

export type Page = {
  type: 'page'
  title: string
  section?: string
  deprecated?: boolean
  href: string
  content?: string
  previous?: NavigationPage
  next?: NavigationPage
}

export type Menu = {
  type: 'menu'
  title: string
  children: PageTree[]
}

export type PageTree = Page | Menu
