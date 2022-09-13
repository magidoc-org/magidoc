import _ from 'lodash'
import type { GraphQLFactory } from './config'

const date = '2022-03-06'
const dateTime = '2022-03-06T08:23:45.000Z'
const id = '08a16b83-9094-4e89-8c05-2ccadd5c1c7e'
const url = 'https://website.com'
const float = 30.7

export const DEFAULT_FACTORIES: Record<string, GraphQLFactory> = withVariants(
  withAliases({
    // Common GraphQL Types
    String: (context) => {
      switch (context.targetName.toLowerCase()) {
        case 'email':
        case 'emails':
        case 'mail':
        case 'mails':
          return 'test-email@yourcompany.com'
        case 'fullname':
        case 'fullnames':
          return 'John Doe'
        case 'firstname':
        case 'firstnames':
          return 'John'
        case 'lastname':
        case 'lastnames':
          return 'Doe'
        case 'job':
        case 'jobs':
        case 'jobtitle':
        case 'jobtitles':
          return 'Engineer'
        case 'jobarea':
          return 'Engineering'
        case 'phone':
        case 'phones':
          return '1+ 418-323-4236'
        case 'country':
        case 'countries':
          return 'Canada'
        case 'address':
        case 'addresses':
          return '2832 Sesame Street'
        case 'state':
        case 'states':
        case 'province':
        case 'provinces':
          return 'Quebec'
        case 'city':
        case 'cities':
        case 'town':
        case 'towns':
          return 'Montreal'
        case 'zipcode':
        case 'zipcodes':
          return 'G1G 43F'
        case 'company':
        case 'companies':
          return 'Acme Inc'
        case 'department':
        case 'departments':
          return 'Engineering'
        case 'datetime':
        case 'datetimes':
        case 'timestamp':
        case 'timestamps':
        case 'timestampz':
        case 'instant':
        case 'instants':
          return dateTime
        case 'date':
        case 'dates':
          return date
        case 'price':
        case 'prices':
          return '$1,234.56'
        case 'color':
        case 'colors':
        case 'paint':
        case 'paints':
          return '#e10098'
        case 'product':
        case 'products':
          return 'Soup'
        case 'material':
        case 'materials':
          return 'Wood'
        case 'id':
        case 'ids':
        case 'identifier':
        case 'identifiers':
        case 'uuid':
        case 'uuids':
          return id
        case 'size':
        case 'sizes':
          return 'Large'
        case 'url':
        case 'urls':
          return url
        case 'name':
        case 'names':
          return 'A name'
        case 'description':
        case 'descriptions':
          return 'A description'
        default:
          return context.targetName
      }
    },
    ID: () => id,
    Boolean: () => true,
    Int: (context) => {
      switch (context.targetName.toLocaleLowerCase()) {
        case 'salary':
        case 'salaries':
          return 70_000
        case 'age':
        case 'ages':
          return 36
        default:
          return 42
      }
    },
    Float: () => float,
    Date: () => date,
    DateTime: () => dateTime,
    URL: () => url,
    JSON: () => ({}),
  }),
)

function withVariants(
  record: Record<string, GraphQLFactory>,
): Record<string, GraphQLFactory> {
  return {
    ..._.reduce(
      record,
      (acc, value, key) => ({
        ...acc,
        // Full lowercase
        [key.toLowerCase()]: value,
        // Only first letter lowercase
        [key[0].toLowerCase() + key.slice(1)]: value,
      }),
      {},
    ),
    ...record,
  }
}

function withAliases(
  record: Record<string, GraphQLFactory>,
): Record<string, GraphQLFactory> {
  return {
    ...record,
    Instant: record['DateTime'],
    Id: record['ID'],
    BigInteger: record['Int'],
    BigNumber: record['Int'],
    Long: record['Int'],
    Url: record['URL'],

    // Hasura types
    _text: record['String'],
    Float8: record['Float'],
    Numeric: record['Int'],
    SmallInt: record['Int'],
    Timestamp: record['DateTime'],
    Timestamptz: record['DateTime'],
    JsonB: record['JSON'],
  }
}
