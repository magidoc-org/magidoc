import * as variables from '../src/index'
import type { Variable } from '../src/variables/variable'

describe('variables', () => {
  it('contains the right number of export keys', () => {
    expect(Object.keys(variables)).toEqual(['templates', 'magidoc'])
  })

  it('contains the right templates variables', () => {
    expect(Object.keys(variables.templates)).toEqual(['APP_LOGO', 'APP_TITLE'])

    testStringVariable(variables.templates.APP_TITLE, 'VITE_APP_TITLE')
    testStringVariable(variables.templates.APP_LOGO, 'VITE_APP_LOGO')
  })

  it('contains the right magidoc variables', () => {
    expect(Object.keys(variables.magidoc)).toEqual(['MAGIDOC_GENERATE'])

    testBooleanVariable(
      variables.magidoc.MAGIDOC_GENERATE,
      'VITE_MAGIDOC_GENERATE',
    )
  })
})

function testStringVariable(target: Variable<string>, viteKey: string) {
  expect(target.vite.key).toEqual(viteKey)

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

function testBooleanVariable(target: Variable<boolean>, viteKey: string) {
  expect(target.vite.key).toEqual(viteKey)

  expect(target.vite.get({ [viteKey]: true })).toBe(true)
  expect(target.vite.get({ [viteKey]: 'true' })).toBe(true)
  expect(target.vite.get({ [viteKey]: 't' })).toBe(true)
  expect(target.vite.get({ [viteKey]: '1' })).toBe(true)
  expect(target.vite.get({ [viteKey]: 12 })).toBe(true)

  expect(target.vite.get({ [viteKey]: false })).toBe(false)
  expect(target.vite.get({ [viteKey]: 'false' })).toBe(false)
  expect(target.vite.get({ [viteKey]: 'wow' })).toBe(false)
  expect(target.vite.get({ [viteKey]: 0 })).toBe(false)

  expect(target.vite.get({ [viteKey]: {} })).toBeNull()
  expect(target.vite.get({ [viteKey]: null })).toBeNull()
  expect(target.vite.get({ [viteKey]: undefined })).toBeNull()
  expect(target.vite.get({})).toBeNull()

  expect(target.vite.getOrDefault({ [viteKey]: false }, true)).toBe(false)
  expect(target.vite.getOrDefault({ [viteKey]: {} }, true)).toBe(true)
  expect(target.vite.getOrDefault({}, true)).toBe(true)
}
