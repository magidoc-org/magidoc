import type { ZodType } from 'zod'
import * as variables from '../src/index'
import type { Variable } from '../src/variables/variable'
import z from 'zod'
import type { Page } from '../src/index'
import { describe, expect, it, test } from 'vitest'

describe('variables', () => {
  it('contains the right number of export keys', () => {
    expect(Object.keys(variables)).toEqual([
      'templates',
      'magidoc',
      'toVariablesFile',
      'UnsupportedVariablesError',
    ])
  })

  describe('template variables', () => {
    it('contains the right templates variables', () => {
      expect(Object.keys(variables.templates)).toEqual([
        'APP_LOGO',
        'APP_TITLE',
        'APP_FAVICON',

        'SITE_ROOT',
        'SITE_META',
        'CUSTOM_STYLES',
        'FIELDS_SORTING',
        'ARGUMENTS_SORTING',
        'QUERY_GENERATION_FACTORIES',
        'PAGES',
        'EXTERNAL_LINKS',
        'DIRECTIVES',
      ])
    })

    test('app title', () => {
      testStringVariable(
        variables.templates.APP_TITLE,
        'APP_TITLE',
        z.string().optional(),
      )
    })

    test('app logo', () => {
      testStringVariable(
        variables.templates.APP_LOGO,
        'APP_LOGO',
        z.string().optional(),
      )
    })

    test('app favicon', () => {
      testStringVariable(
        variables.templates.APP_FAVICON,
        'APP_FAVICON',
        z.string().optional(),
      )
    })

    test('site root', () => {
      testStringVariable(
        variables.templates.SITE_ROOT,
        'SITE_ROOT',
        z.string().optional(),
      )
    })

    test('site meta', () => {
      testRecordVariable(
        variables.templates.SITE_META,
        'SITE_META',
        z.record(z.string().optional()).optional(),
      )
    })

    test('custom styles', () => {
      testArrayVariable(
        variables.templates.CUSTOM_STYLES,
        'CUSTOM_STYLES',
        z.array(z.string()).optional(),
      )
    })

    test('fields sorting', () => {
      testEnumVariable(
        variables.templates.FIELDS_SORTING,
        ['default', 'alphabetical'],
        'FIELDS_SORTING',
        z.enum(['default', 'alphabetical']).optional(),
      )
    })

    test('arguments sorting', () => {
      testEnumVariable(
        variables.templates.ARGUMENTS_SORTING,
        ['default', 'alphabetical'],
        'ARGUMENTS_SORTING',
        z.enum(['default', 'alphabetical']).optional(),
      )
    })

    test('query generation factories', () => {
      testRecordVariable(
        variables.templates.QUERY_GENERATION_FACTORIES,
        'QUERY_GENERATION_FACTORIES',
        z
          .record(
            z
              .union([
                z.string(),
                z.boolean(),
                z.number(),
                z.null(),
                z.record(z.unknown()),
              ])
              .optional(),
          )
          .optional(),
      )
    })

    test('pages', () => {
      const pagesType: ZodType<Page> = z.lazy(() =>
        z.object({
          title: z.string(),
          content: z.union([z.array(pagesType), z.string()]),
        }),
      )

      testArrayVariable(
        variables.templates.PAGES,
        'PAGES',
        z.array(pagesType).optional(),
      )
    })

    test('external links', () => {
      testArrayVariable(
        variables.templates.EXTERNAL_LINKS,
        'EXTERNAL_LINKS',
        z
          .array(
            z.object({
              label: z.string().min(1),
              href: z.string().min(1),
              kind: z.string().min(1).optional(),
              group: z.string().min(1).optional(),
            }),
          )
          .optional(),
      )
    })

    test('directives', () => {
      testArrayVariable(
        variables.templates.DIRECTIVES,
        'DIRECTIVES',
        z
          .array(
            z.object({
              name: z.string().min(1),
              args: z.array(z.string()),
            }),
          )
          .optional(),
      )
    })
  })

  describe('magidoc variables', () => {
    it('contains the right magidoc variables', () => {
      expect(Object.keys(variables.magidoc)).toEqual(['MAGIDOC_GENERATE'])
    })

    test('magidoc generate', () => {
      testBooleanVariable(
        variables.magidoc.MAGIDOC_GENERATE,
        'MAGIDOC_GENERATE',
        z.boolean().optional(),
      )
    })
  })
})

function testStringVariable(
  target: Variable<string>,
  key: string,
  expectedZod: ZodType<any>,
) {
  expect(target.key).toEqual(key)

  expect(target.get({ [key]: 'Potato' })).toBe('Potato')
  expect(target.get({ [key]: false })).toBe('false')
  expect(target.get({})).toBeNull()

  expect(target.getOrDefault({ [key]: 'Potato' }, 'Default')).toBe('Potato')
  expect(target.getOrDefault({ [key]: false }, 'Default')).toBe('false')
  expect(target.getOrDefault({}, 'Default')).toBe('Default')

  expect(target.asEnv('Potato')).toEqual({ [key]: 'Potato' })

  ensureZodTypeEqual(target, expectedZod)
}

function testEnumVariable<V extends string>(
  target: Variable<V>,
  values: [V, V, ...V[]],
  key: string,
  expectedZod: ZodType<any>,
) {
  expect(target.key).toEqual(key)

  values.forEach((value) => {
    expect(target.get({ [key]: value })).toBe(value)
  })

  expect(target.get({ [key]: 'something-else' })).toBeNull()
  expect(target.get({})).toBeNull()

  expect(target.getOrDefault({ [key]: values[0] }, values[1])).toBe(values[0])
  expect(target.getOrDefault({ [key]: false }, values[1])).toBe(values[1])
  expect(target.getOrDefault({}, values[0])).toBe(values[0])

  expect(target.asEnv(values[0])).toEqual({ [key]: values[0] })

  ensureZodTypeEqual(target, expectedZod)
}

function testBooleanVariable(
  target: Variable<boolean>,
  viteKey: string,
  expectedZod: ZodType<any>,
) {
  expect(target.key).toEqual(viteKey)

  expect(target.get({ [viteKey]: true })).toBe(true)
  expect(target.get({ [viteKey]: 'true' })).toBe(true)
  expect(target.get({ [viteKey]: 't' })).toBe(true)
  expect(target.get({ [viteKey]: '1' })).toBe(true)
  expect(target.get({ [viteKey]: 12 })).toBe(true)

  expect(target.get({ [viteKey]: false })).toBe(false)
  expect(target.get({ [viteKey]: 'false' })).toBe(false)
  expect(target.get({ [viteKey]: 'wow' })).toBe(false)
  expect(target.get({ [viteKey]: 0 })).toBe(false)

  expect(target.get({ [viteKey]: {} })).toBeNull()
  expect(target.get({ [viteKey]: null })).toBeNull()
  expect(target.get({ [viteKey]: undefined })).toBeNull()
  expect(target.get({})).toBeNull()

  expect(target.getOrDefault({ [viteKey]: false }, true)).toBe(false)
  expect(target.getOrDefault({ [viteKey]: {} }, true)).toBe(true)
  expect(target.getOrDefault({}, true)).toBe(true)

  expect(target.asEnv(true)).toEqual({ [viteKey]: 'true' })
  expect(target.asEnv(false)).toEqual({ [viteKey]: 'false' })

  ensureZodTypeEqual(target, expectedZod)
}

function testRecordVariable(
  target: Variable<Record<string, any>>,
  key: string,
  expectedZod: ZodType<any>,
) {
  expect(target.key).toEqual(key)

  expect(target.get({ [key]: true })).toBeNull()
  expect(target.get({ [key]: 'true' })).toBeNull()
  expect(target.get({ [key]: '4234' })).toBeNull()
  expect(target.get({ [key]: 4234 })).toBeNull()

  expect(target.get({ [key]: { abc: '123' } })).toEqual({ abc: '123' })
  expect(target.get({ [key]: JSON.stringify({ abc: '123' }) })).toEqual({
    abc: '123',
  })

  expect(target.getOrDefault({ [key]: false }, { abc: 123 })).toEqual({
    abc: 123,
  })
  expect(target.getOrDefault({ [key]: {} }, { abc: 123 })).toEqual({})
  expect(target.getOrDefault({}, { abc: 123 })).toEqual({ abc: 123 })

  expect(target.asEnv({ abc: 123 })).toEqual({
    [key]: JSON.stringify({ abc: 123 }),
  })
  expect(target.asEnv({})).toEqual({ [key]: '{}' })

  ensureZodTypeEqual(target, expectedZod)
}

function testArrayVariable(
  target: Variable<Array<any>>,
  key: string,
  expectedZod: ZodType<any>,
) {
  expect(target.key).toEqual(key)

  expect(target.get({ [key]: true })).toBeNull()
  expect(target.get({ [key]: 'true' })).toBeNull()
  expect(target.get({ [key]: '4234' })).toBeNull()
  expect(target.get({ [key]: 4234 })).toBeNull()
  expect(target.get({ [key]: {} })).toBeNull()

  expect(target.get({ [key]: [{ abc: '123' }] })).toEqual([{ abc: '123' }])
  expect(target.get({ [key]: JSON.stringify([{ abc: '123' }]) })).toEqual([
    { abc: '123' },
  ])

  expect(target.getOrDefault({ [key]: false }, [{ abc: 123 }])).toEqual([
    {
      abc: 123,
    },
  ])
  expect(target.getOrDefault({ [key]: [] }, [{ abc: 123 }])).toEqual([])
  expect(target.getOrDefault({}, [{ abc: 123 }])).toEqual([{ abc: 123 }])

  expect(target.asEnv([{ abc: 123 }])).toEqual({
    [key]: JSON.stringify([{ abc: 123 }]),
  })
  expect(target.asEnv([])).toEqual({ [key]: '[]' })

  ensureZodTypeEqual(target, expectedZod)
}

function ensureZodTypeEqual(target: Variable<any>, expected: ZodType<any>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // this does a good enough compare to make sure they have the same schema
  expect(JSON.parse(JSON.stringify(target.zod.type(z)))).toEqual(
    JSON.parse(JSON.stringify(expected, null, 2)),
  )
}
