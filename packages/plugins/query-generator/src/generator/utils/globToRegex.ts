export default function (glob: string) {
  // The regexp we are building, as a string.
  let reStr = ''

  let currentChar
  for (let i = 0, len = glob.length; i < len; i++) {
    currentChar = glob[i]

    switch (currentChar) {
      case '/':
      case '$':
      case '^':
      case '+':
      case '.':
      case '(':
      case ')':
      case '=':
      case '!':
      case '|':
        reStr += '\\' + currentChar
        break
      case '?':
        reStr += '.'
      case '*':
        // Converts any number of ** into one
        while (glob[i + 1] === '*') {
          i++
        }

        reStr += '.*'
        break

      default:
        reStr += currentChar
    }
  }

  reStr = '^' + reStr + '$'

  return new RegExp(reStr)
}
