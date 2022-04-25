import * as variables from '../src/index'
import type { Variable } from '../src/variables/variable'
import z from 'zod'

describe('variables', () => {
  it('contains the right number of export keys', () => {
    expect(Object.keys(variables)).toEqual(['templates', 'magidoc'])
  })

  it('contains the right templates variables', () => {
    expect(Object.keys(variables.templates)).toEqual([
      'APP_LOGO',
      'APP_TITLE',
      'QUERY_GENERATION_FACTORIES',
    ])

    testStringVariable(variables.templates.APP_TITLE, 'VITE_APP_TITLE')
    testStringVariable(variables.templates.APP_LOGO, 'VITE_APP_LOGO')
    testRecordVariable(
      variables.templates.QUERY_GENERATION_FACTORIES,
      'VITE_QUERY_GENERATION_FACTORIES',
    )
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

  expect(target.asEnv('Potato')).toEqual({ [viteKey]: 'Potato' })
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

  expect(target.asEnv(true)).toEqual({ [viteKey]: 'true' })
  expect(target.asEnv(false)).toEqual({ [viteKey]: 'false' })
}

function testRecordVariable(
  target: Variable<Record<string, unknown>>,
  viteKey: string,
) {
  expect(target.vite.key).toEqual(viteKey)

  expect(target.vite.get({ [viteKey]: true })).toBeNull()
  expect(target.vite.get({ [viteKey]: 'true' })).toBeNull()
  expect(target.vite.get({ [viteKey]: '4234' })).toBeNull()
  expect(target.vite.get({ [viteKey]: 4234 })).toBeNull()

  expect(target.vite.get({ [viteKey]: { abc: '123' } })).toEqual({ abc: '123' })
  expect(
    target.vite.get({ [viteKey]: JSON.stringify({ abc: '123' }) }),
  ).toEqual({ abc: '123' })

  expect(target.vite.getOrDefault({ [viteKey]: false }, { abc: 123 })).toEqual({
    abc: 123,
  })
  expect(target.vite.getOrDefault({ [viteKey]: {} }, { abc: 123 })).toEqual({})
  expect(target.vite.getOrDefault({}, { abc: 123 })).toEqual({ abc: 123 })

  expect(target.asEnv({ abc: 123 })).toEqual({
    [viteKey]: JSON.stringify({ abc: 123 }),
  })
  expect(target.asEnv({})).toEqual({ [viteKey]: '{}' })
}
