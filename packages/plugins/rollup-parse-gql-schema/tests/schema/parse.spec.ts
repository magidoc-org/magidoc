import path from 'path'

describe('when parsing a single file', () => {
  const file = relativeToAbsolute('./samples/single-file.graphqls')
})

describe('when parsing glob files', () => {
  describe('with a single glob path', () => {
    const glob = relativeToAbsolute('./samples/multi-file/**/*.graphqls')
  })

  describe('with multiple paths', () => {
    const globs = [
      relativeToAbsolute('./samples/multi-file/sub-folder/*.graphqls'),
      relativeToAbsolute('./samples/multi-file/query.graphqls'),
      relativeToAbsolute('./samples/multi-file/*.graphqls'),
    ]

    it('should parse the schema properly', () => {
        
    })
  })
})

function relativeToAbsolute(target: string): string {
  return path.join(__dirname, target)
}
