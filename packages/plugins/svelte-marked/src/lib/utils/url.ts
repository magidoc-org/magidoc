import type Slugger from 'github-slugger'

export function joinUrlPaths(...paths: string[]): string {
  return `/${paths
    .flatMap((path) => path.split('/'))
    .filter((path) => !!path)
    .join('/')}`
}

export function isRelative(url: string): boolean {
  return url.startsWith('/') || url.startsWith('#')
}

export function generatePathSegment(name: string, slugger: Slugger) {
  return slugger.slug(name).replace(/--+/g, '-') // Replaces -- with -
}
