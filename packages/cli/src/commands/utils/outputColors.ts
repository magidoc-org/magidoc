export type OutputValue = string | number

export function red(value: OutputValue): string {
  return `\u001b[31m${value}${reset()}`
}

export function cyan(value: OutputValue): string {
  return `\u001b[36m${value}${reset()}`
}

export function yellow(value: OutputValue): string {
  return `\u001b[33m${value}${reset()}`
}

function reset(): string {
  return '\u001b[0m'
}
