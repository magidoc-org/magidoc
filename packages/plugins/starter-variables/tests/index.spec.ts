import * as variables from '../src/index'
import type { Variable } from '../src/variable'

describe('variables', () => {
  it('contains the right number of export keys', () => {
    expect(Object.keys(variables)).toEqual(['common'])
  })

  it('contains the right common variables', () => {
    expect(Object.keys(variables.common)).toEqual(['APP_LOGO', 'APP_TITLE'])

    testStringVariable(variables.common.APP_TITLE, 'VITE_APP_TITLE')
    testStringVariable(variables.common.APP_LOGO, 'VITE_APP_LOGO')
  })
})

function testStringVariable(target: Variable<string>, viteKey: string) {
  expect(target.vite.key).toEqual(viteKey)

  console.log({ env: { [viteKey]: 'Potato' } })
  expect(target.vite.get({ [viteKey]: 'Potato' })).toBe('Potato')
  expect(target.vite.get({ [viteKey]: false })).toBe('false')
  expect(target.vite.get({})).toBeNull()

  expect(target.vite.getOrDefault({ [viteKey]: 'Potato' }, 'Default')).toBe(
    'Potato',
  )
  expect(target.vite.getOrDefault({ [viteKey]: false }, 'Default')).toBe(
    'false',
  )
  expect(target.vite.getOrDefault({}, 'Default')).toBe('Default')
}
