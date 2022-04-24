import { DEFAULT_FACTORIES } from '../../src/generator/defaultFactories'

describe('generating default values', () => {
  beforeAll(() => {
    expect(Object.keys(DEFAULT_FACTORIES)).toHaveLength(12)
  })

  describe('input is a string', () => {
    test.each(['Email', 'Emails', 'mail', 'mails'])(
      'should generate an email for input type %s',
      (name) =>
        expect(runFactory('String', name)).toEqual(
          'test-email@yourcompany.com',
        ),
    )

    test.each(['fullname', 'Fullnames'])(
      'should generate a full name for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('John Doe'),
    )

    test.each(['firstName', 'firstNames'])(
      'should generate a first name for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('John'),
    )

    test.each(['LastName', 'lastNames'])(
      'should generate a last name for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('Doe'),
    )

    test.each(['job', 'Job', 'JobTitle', 'JobTitles'])(
      'should generate a job title for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('Engineer'),
    )

    test.each(['jobArea'])(
      'should generate a job area for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('Engineering'),
    )

    test.each(['Phone', 'Phones'])(
      'should generate a phone for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('1+ 418-323-4236'),
    )

    test.each(['Country', 'Countries'])(
      'should generate a country for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('Canada'),
    )

    test.each(['address', 'addresses'])(
      'should generate a country for input type %s',
      (name) =>
        expect(runFactory('String', name)).toEqual('2832 Sesame Street'),
    )

    test.each(['state', 'states'])(
      'should generate a state for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('Quebec'),
    )

    test.each(['city', 'cities'])(
      'should generate a city for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('Montreal'),
    )

    test.each(['zipCode', 'ZipCodes'])(
      'should generate a zip code for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('G1G 43F'),
    )

    test.each(['company', 'Companies'])(
      'should generate a company for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('Acme'),
    )

    test.each(['department', 'Departments'])(
      'should generate a department for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('Engineering'),
    )

    test.each(['date', 'dates', 'datetime', 'datetimes', 'instant'])(
      'should generate a date for input type %s',
      (name) =>
        expect(runFactory('String', name)).toEqual('2022-03-06T08:23:45.000Z'),
    )

    test.each(['price', 'prices'])(
      'should generate a price for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('500$'),
    )

    test.each(['color', 'colors'])(
      'should generate a color for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('#e10098'),
    )

    test.each(['product', 'products'])(
      'should generate a product for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('Soup'),
    )

    test.each(['material', 'materials'])(
      'should generate a material for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('Wood'),
    )

    test.each(['id', 'ids'])(
      'should generate an id for input type %s',
      (name) =>
        expect(runFactory('String', name)).toEqual(
          '08a16b83-9094-4e89-8c05-2ccadd5c1c7e',
        ),
    )

    test.each(['name', 'names'])(
      'should generate a name for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('Some name'),
    )

    test.each(['description', 'descriptions'])(
      'should generate a description for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('Some description'),
    )

    test.each(['everythingelse', 'somestuff'])(
      'should generate a generic string for input type %s',
      (name) => expect(runFactory('String', name)).toEqual('abc'),
    )
  })

  describe('input is an int', () => {
    test.each(['Salary', 'Salaries'])(
      'should generate a salary for input type %s',
      (name) => expect(runFactory('Int', name)).toEqual(70_000),
    )

    test.each(['age', 'Ages'])(
      'should generate a salary for input type %s',
      (name) => expect(runFactory('Int', name)).toEqual(42),
    )

    test.each(['anythingelse', 'asd'])(
      'should generate a generic number for input type %s',
      (name) => expect(runFactory('Int', name)).toEqual(20),
    )
  })

  describe('input is a float', () => {
    test.each(['anythingelse', 'asd'])(
      'should generate a generic float for input type %s',
      (name) => expect(runFactory('Float', name)).toEqual(30.7),
    )
  })

  describe('input is a boolean', () => {
    test.each(['anythingelse', 'asd'])(
      'should generate a generic boolean for input type %s',
      (name) => expect(runFactory('Boolean', name)).toEqual(true),
    )
  })

  describe('input is an ID', () => {
    test.each(['anythingelse', 'asd'])(
      'should generate a generic ID for input type %s',
      (name) =>
        expect(runFactory('ID', name)).toEqual(
          '08a16b83-9094-4e89-8c05-2ccadd5c1c7e',
        ),
    )
  })

  describe('input is a Date', () => {
    test.each(['anythingelse', 'asd'])(
      'should generate a generic date for input type %s',
      (name) =>
        expect(runFactory('Date', name)).toEqual('2022-03-06T08:23:45.000Z'),
    )
  })

  describe('input is a DateTime', () => {
    test.each(['anythingelse', 'asd'])(
      'should generate a generic datetime for input type %s',
      (name) =>
        expect(runFactory('DateTime', name)).toEqual(
          '2022-03-06T08:23:45.000Z',
        ),
    )
  })

  describe('input is an Instant', () => {
    test.each(['anythingelse', 'asd'])(
      'should generate a generic instant for input type %s',
      (name) =>
        expect(runFactory('Instant', name)).toEqual('2022-03-06T08:23:45.000Z'),
    )
  })

  describe('input is a Big Integer', () => {
    test.each(['anythingelse', 'asd'])(
      'should generate a generic big number for input type %s',
      (name) => expect(runFactory('BigInteger', name)).toEqual(123456789),
    )
  })

  describe('input is a Long', () => {
    test.each(['anythingelse', 'asd'])(
      'should generate a generic big number for input type %s',
      (name) => expect(runFactory('Long', name)).toEqual(123456789),
    )
  })

  describe('input is an URL', () => {
    test.each(['anythingelse', 'asd'])(
      'should generate a generic big number for input type %s',
      (name) => expect(runFactory('URL', name)).toEqual('https://website.com'),
    )

    test.each(['anythingelse', 'asd'])(
      'should generate a generic big number for input type %s',
      (name) => expect(runFactory('Url', name)).toEqual('https://website.com'),
    )
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
