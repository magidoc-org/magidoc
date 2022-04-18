import * as variables from '../src/index'

describe('variables', () => {
  it('contains the right number of export keys', () => {
    expect(Object.keys(variables)).toEqual(['common'])
  })

  it('contains the right common variables', () => {
    expect(variables.common).toEqual({
      APP_LOGO_PATH: 'APP_LOGO_PATH',
      APP_TITLE: 'APP_TITLE',
    })
  })
})
