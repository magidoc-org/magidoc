export enum Template {
  MULTI_PAGE = 'multi-page',
}

export function availableTemplates(): Template[] {
  return Object.values(Template).map((value) => value as Template)
}
