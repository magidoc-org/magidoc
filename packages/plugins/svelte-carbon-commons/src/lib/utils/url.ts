export function joinUrlPaths(...paths: string[]): string {
  return (
    '/' +
    paths
      .flatMap((path) => path.split('/'))
      .filter((path) => !!path)
      .join('/')
  )
}
