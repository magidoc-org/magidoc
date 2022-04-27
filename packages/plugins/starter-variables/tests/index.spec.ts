import type { ZodType } from 'zod'
import * as variables from '../src/index'
import type { Variable } from '../src/variables/variable'
import z from 'zod'
import type { Page } from '../src/index'

describe('variables', () => {
  it('contains the right number of export keys', () => {
    expect(Object.keys(variables)).toEqual(['templates', 'magidoc'])
  })

  describe('template variables', () => {
    it('contains the right templates variables', () => {
      expect(Object.keys(variables.templates)).toEqual([
        'APP_LOGO',
        'APP_TITLE',
        'SITE_ROOT',
        'QUERY_GENERATION_FACTORIES',
        'PAGES',
      ])
    })

    test('app title', () => {
      testStringVariable(
        variables.templates.APP_TITLE,
        'VITE_APP_TITLE',
        z.string().optional(),
      )
    })

    test('app logo', () => {
      testStringVariable(
        variables.templates.APP_LOGO,
        'VITE_APP_LOGO',
        z.string().optional(),
      )
    })

    test('site root', () => {
      testStringVariable(
        variables.templates.SITE_ROOT,
        'VITE_SITE_ROOT',
        z.string().optional(),
      )
    })

    test('query generation factories', () => {
      testRecordVariable(
        variables.templates.QUERY_GENERATION_FACTORIES,
        'VITE_QUERY_GENERATION_FACTORIES',
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
        'VITE_PAGES',
        z.array(pagesType).optional(),
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
        'VITE_MAGIDOC_GENERATE',
        z.boolean().optional(),
      )
    })
  })
})

function testStringVariable(
  target: Variable<string>,
  viteKey: string,
  expectedZod: ZodType<any>,
) {
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

  ensureZodTypeEqual(target, expectedZod)
}

function testBooleanVariable(
  target: Variable<boolean>,
  viteKey: string,
  expectedZod: ZodType<any>,
) {
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

  ensureZodTypeEqual(target, expectedZod)
}

function testRecordVariable(
  target: Variable<Record<string, any>>,
  viteKey: string,
  expectedZod: ZodType<any>,
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

  ensureZodTypeEqual(target, expectedZod)
}

function testArrayVariable(
  target: Variable<Array<any>>,
  viteKey: string,
  expectedZod: ZodType<any>,
) {
  expect(target.vite.key).toEqual(viteKey)

  expect(target.vite.get({ [viteKey]: true })).toBeNull()
  expect(target.vite.get({ [viteKey]: 'true' })).toBeNull()
  expect(target.vite.get({ [viteKey]: '4234' })).toBeNull()
  expect(target.vite.get({ [viteKey]: 4234 })).toBeNull()
  expect(target.vite.get({ [viteKey]: {} })).toBeNull()

  expect(target.vite.get({ [viteKey]: [{ abc: '123' }] })).toEqual([
    { abc: '123' },
  ])
  expect(
    target.vite.get({ [viteKey]: JSON.stringify([{ abc: '123' }]) }),
  ).toEqual([{ abc: '123' }])

  expect(
    target.vite.getOrDefault({ [viteKey]: false }, [{ abc: 123 }]),
  ).toEqual([
    {
      abc: 123,
    },
  ])
  expect(target.vite.getOrDefault({ [viteKey]: [] }, [{ abc: 123 }])).toEqual(
    [],
  )
  expect(target.vite.getOrDefault({}, [{ abc: 123 }])).toEqual([{ abc: 123 }])

  expect(target.asEnv([{ abc: 123 }])).toEqual({
    [viteKey]: JSON.stringify([{ abc: 123 }]),
  })
  expect(target.asEnv([])).toEqual({ [viteKey]: '[]' })

  ensureZodTypeEqual(target, expectedZod)
}

function ensureZodTypeEqual(target: Variable<any>, expected: ZodType<any>) {
  // @ts-ignore
  // this does a good enough compare to make sure they have the same schema
  expect(JSON.parse(JSON.stringify(target.zod.type(z)))).toEqual(
    JSON.parse(JSON.stringify(expected, null, 2)),
  )
}
