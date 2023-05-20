declare module 'marked-gfm-heading-id' {
  type Extension = {
    hooks: {
      preprocess: (markdown: string) => string
    }
    renderer: {
      heading: (text: string, level: number, raw: string) => string
    }
  }

  export type Parameters = {
    prefix?: string
  }

  export const gfmHeadingId: (params?: Parameters) => Extension
}
