import Variables from '../src/index'

describe('variables', () => {
  it('contains the right number of export keys', () => {
    expect(Object.keys(Variables)).toEqual(['common'])
  })

  it('contains the right common variables', () => {
    expect(Variables.common).toEqual({
      APP_LOGO_PATH: 'APP_LOGO_PATH',
      APP_TITLE: 'APP_TITLE',
    })
  })
})
