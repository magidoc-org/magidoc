export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * This function simply allow to use markdown into template strings in order to gain syntax highlight
 */
export function markdown(target: TemplateStringsArray): string {
  return target.toString()
}
