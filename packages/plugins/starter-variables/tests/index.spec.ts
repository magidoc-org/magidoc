import * as variables from '../src/index'
import type { Variable } from '../src/variable'

describe('variables', () => {
  it('contains the right number of export keys', () => {
    expect(Object.keys(variables)).toEqual(['common'])
  })

  it('contains the right common variables', () => {
    expect(Object.keys(variables.common)).toEqual([
      'APP_LOGO_PATH',
      'APP_TITLE',
    ])

    testStringVariable(variables.common.APP_LOGO_PATH, 'VITE_APP_LOGO_PATH')
    testStringVariable(variables.common.APP_TITLE, 'VITE_APP_TITLE')
  })
})

function testStringVariable(target: Variable<string>, viteKey: string) {
  expect(target.vite.key).toEqual(viteKey)

  console.log({ env: { [viteKey]: 'Potato' } })
  expect(target.vite.get({ env: { [viteKey]: 'Potato' } })).toBe('Potato')
  expect(target.vite.get({ env: { [viteKey]: false } })).toBe('false')
  expect(target.vite.get({ env: {} })).toBeNull()

  expect(
    target.vite.getOrDefault({ env: { [viteKey]: 'Potato' } }, 'Default'),
  ).toBe('Potato')
  expect(
    target.vite.getOrDefault({ env: { [viteKey]: false } }, 'Default'),
  ).toBe('false')
  expect(target.vite.getOrDefault({ env: {} }, 'Default')).toBe('Default')
}
