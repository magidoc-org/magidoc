import { describe, test, expect, beforeAll } from 'vitest'
import { DEFAULT_FACTORIES } from '../../src/generator/defaultFactories'

export type TestSet<T> = {
  type: string
  names: string[]
  expected: T
}

const ALL_SETS: ReadonlyArray<TestSet<unknown>> = [
  {
    type: 'String',
    names: ['Email', 'Emails', 'mail', 'mails'],
    expected: 'test-email@yourcompany.com',
  },
  {
    type: 'String',
    names: ['fullname', 'Fullnames'],
    expected: 'John Doe',
  },
  {
    type: 'String',
    names: ['firstname', 'FirstNames'],
    expected: 'John',
  },
  {
    type: 'String',
    names: ['LastName', 'lastNames'],
    expected: 'Doe',
  },
  {
    type: 'String',
    names: ['job', 'Job', 'JobTitle', 'JobTitles'],
    expected: 'Engineer',
  },
  {
    type: 'String',
    names: ['jobArea', 'departments', 'department'],
    expected: 'Engineering',
  },
  {
    type: 'String',
    names: ['Phone', 'Phones'],
    expected: '1+ 418-323-4236',
  },
  {
    type: 'String',
    names: ['country', 'Countries'],
    expected: 'Canada',
  },
  {
    type: 'String',
    names: ['address', 'Addresses'],
    expected: '2832 Sesame Street',
  },
  {
    type: 'String',
    names: ['State', 'states', 'province', 'provinces'],
    expected: 'Quebec',
  },
  {
    type: 'String',
    names: ['City', 'cities', 'town', 'towns'],
    expected: 'Montreal',
  },
  {
    type: 'String',
    names: ['zipCode', 'zipCodes'],
    expected: 'G1G 43F',
  },
  {
    type: 'String',
    names: ['company', 'Companies'],
    expected: 'Acme Inc',
  },
  {
    type: 'String',
    names: [
      'datetime',
      'datetimes',
      'instant',
      'timestamp',
      'timestampz',
      'timestamps',
    ],
    expected: '2022-03-06T08:23:45.000Z',
  },
  {
    type: 'String',
    names: ['date', 'dates'],
    expected: '2022-03-06',
  },
  {
    type: 'String',
    names: ['price', 'prices'],
    expected: '$1,234.56',
  },
  {
    type: 'String',
    names: ['color', 'colors', 'paint', 'paints'],
    expected: '#e10098',
  },
  {
    type: 'String',
    names: ['product', 'products'],
    expected: 'Soup',
  },
  {
    type: 'String',
    names: ['material', 'materials'],
    expected: 'Wood',
  },
  {
    type: 'String',
    names: ['id', 'ids', 'identifier', 'identifiers', 'uuid', 'uuids'],
    expected: '08a16b83-9094-4e89-8c05-2ccadd5c1c7e',
  },
  {
    type: 'String',
    names: ['size', 'sizes'],
    expected: 'Large',
  },
  {
    type: 'String',
    names: ['name', 'names'],
    expected: 'A name',
  },
  {
    type: 'String',
    names: ['description', 'descriptions'],
    expected: 'A description',
  },
  {
    type: 'String',
    names: ['url', 'urls'],
    expected: 'https://website.com',
  },
  {
    type: 'String',
    names: ['somestuff'],
    expected: 'somestuff',
  },
  {
    type: 'String',
    names: ['everythingelse'],
    expected: 'everythingelse',
  },
  {
    type: '_text',
    names: ['everythingelse'],
    expected: 'everythingelse',
  },
  {
    type: 'Int',
    names: ['salary', 'salaries'],
    expected: 70_000,
  },
  {
    type: 'Int',
    names: ['age', 'ages'],
    expected: 36,
  },
  {
    type: 'Int',
    names: ['anythingelse', 'asd'],
    expected: 42,
  },
  {
    type: 'Numeric',
    names: ['anythingelse', 'asd'],
    expected: 42,
  },
  {
    type: 'SmallInt',
    names: ['anythingelse', 'asd'],
    expected: 42,
  },
  {
    type: 'Float',
    names: ['anythingelse', 'asd'],
    expected: 30.7,
  },
  {
    type: 'Float8',
    names: ['anythingelse', 'asd'],
    expected: 30.7,
  },
  {
    type: 'Boolean',
    names: ['anythingelse', 'asd'],
    expected: true,
  },
  {
    type: 'ID',
    names: ['anythingelse', 'asd'],
    expected: '08a16b83-9094-4e89-8c05-2ccadd5c1c7e',
  },
  {
    type: 'Id',
    names: ['anythingelse', 'asd'],
    expected: '08a16b83-9094-4e89-8c05-2ccadd5c1c7e',
  },
  {
    type: 'Date',
    names: ['anythingelse', 'asd'],
    expected: '2022-03-06',
  },
  {
    type: 'Timestamp',
    names: ['anythingelse', 'asd'],
    expected: '2022-03-06T08:23:45.000Z',
  },
  {
    type: 'Timestamptz',
    names: ['anythingelse', 'asd'],
    expected: '2022-03-06T08:23:45.000Z',
  },
  {
    type: 'DateTime',
    names: ['anythingelse', 'asd'],
    expected: '2022-03-06T08:23:45.000Z',
  },
  {
    type: 'Instant',
    names: ['anythingelse', 'asd'],
    expected: '2022-03-06T08:23:45.000Z',
  },
  {
    type: 'BigInteger',
    names: ['anythingelse', 'asd'],
    expected: 42,
  },
  {
    type: 'BigNumber',
    names: ['anythingelse', 'asd'],
    expected: 42,
  },
  {
    type: 'Long',
    names: ['anythingelse', 'asd'],
    expected: 42,
  },
  {
    type: 'URL',
    names: ['anythingelse', 'asd'],
    expected: 'https://website.com',
  },
  {
    type: 'Url',
    names: ['anythingelse', 'asd'],
    expected: 'https://website.com',
  },
  {
    type: 'JSON',
    names: ['anythingelse', 'asd'],
    expected: {},
  },
  {
    type: 'JsonB',
    names: ['anythingelse', 'asd'],
    expected: {},
  },
]

describe('generating default values', () => {
  beforeAll(() => {
    // If this fails, make sure you add a test for the new types
    expect(Object.keys(DEFAULT_FACTORIES)).toHaveLength(49)
  })

  ALL_SETS.forEach((set) => {
    describe(`input is '${set.type}'`, () => {
      test.each(set.names)(
        `should generate '${set.type}' for input name '%s'`,
        (input) => {
          expect(runFactory(set.type, input)).toEqual(set.expected)
        },
      )

      test.each(set.names.map((name) => name.toLocaleLowerCase()))(
        `should generate '${set.type}' for input name '%s'`,
        (input) => {
          expect(runFactory(set.type, input)).toEqual(set.expected)
        },
      )

      test.each(set.names.map((name) => name[0] + name.slice(1)))(
        `should generate '${set.type}' for input name '%s'`,
        (input) => {
          expect(runFactory(set.type, input)).toEqual(set.expected)
        },
      )
    })
  })
})

function runFactory(type: string, name: string): unknown {
  const factory = DEFAULT_FACTORIES[type]

  if (!factory) {
    fail(`Expected a factory with type '${type}'`)
  }

  return factory({
    depth: 3,
    path: 'whatever',
    targetName: name,
  })
}
