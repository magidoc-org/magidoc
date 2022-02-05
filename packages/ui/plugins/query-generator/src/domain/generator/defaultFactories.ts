import faker from 'faker'

import { GraphQLFactory } from '../config.js'

export const DEFAULT_FACTORIES: Record<string, GraphQLFactory> = {
  String: (context) => {
    switch (context.targetName.toLowerCase()) {
      case 'email':
      case 'emails':
      case 'mail':
      case 'mails':
        return faker.internet.email()
      case 'fullname':
      case 'fullnames':
        return `${faker.name.firstName()} ${faker.name.lastName()}`
      case 'firstname':
      case 'firstnames':
        return faker.name.firstName()
      case 'lastname':
      case 'lastnames':
        return faker.name.lastName()
      case 'job':
      case 'jobs':
      case 'jobtitle':
      case 'jobtitles':
        return faker.name.jobTitle()
      case 'jobarea':
        return faker.name.jobArea()
      case 'phone':
      case 'phones':
        return faker.phone.phoneNumber()
      case 'country':
      case 'countries':
        return faker.address.country()
      case 'address':
      case 'addresses':
        return faker.address.streetAddress(true)
      case 'state':
      case 'states':
        return faker.address.state()
      case 'city':
      case 'cities':
        return faker.address.city()
      case 'zipcode':
      case 'zipcodes':
        return faker.address.zipCode()
      case 'latitude':
        return faker.address.latitude()
      case 'longitude':
        return faker.address.longitude()
      case 'company':
      case 'companies':
        return faker.company.companyName()
      case 'department':
      case 'departments':
        return faker.commerce.department()
      case 'date':
      case 'dates':
        return faker.date.future()
      case 'price':
      case 'prices':
        return faker.commerce.price()
      case 'color':
      case 'colors':
        return faker.commerce.color()
      case 'product':
      case 'products':
        return faker.commerce.product()
      case 'material':
      case 'materials':
        return faker.commerce.productMaterial()
      case 'id':
      case 'ids':
        return faker.datatype.uuid()
      case 'name':
      case 'names':
        return faker.lorem.words()
      case 'description':
      case 'descriptions':
        return faker.lorem.sentence()
      default:
        return faker.random.alphaNumeric()
    }
  },
  ID: () => faker.datatype.uuid(),
  Boolean: () => faker.datatype.boolean(),
  Int: (context) => {
    switch (context.targetName) {
      case 'salary':
      case 'salaries':
        return faker.datatype.number(200_000)
      case 'age':
      case 'ages':
        return faker.datatype.number(90)
      default:
        return faker.datatype.number(100)
    }
  },
  Float: () => faker.datatype.float(100),
}
