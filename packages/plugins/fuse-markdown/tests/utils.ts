export function unindent(target: string): string {
  return target.replace(/^\s+/gm, '')
}
