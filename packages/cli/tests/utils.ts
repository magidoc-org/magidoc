declare global {
  function removeAnsiColors(input: string): string
}

global.removeAnsiColors = function (input: string): string {
  return input
    .replaceAll('\u001b[31m', '')
    .replaceAll('\u001b[36m', '')
    .replaceAll('\u001b[33m', '')
    .replaceAll('\u001b[0m', '')
}

export {}
