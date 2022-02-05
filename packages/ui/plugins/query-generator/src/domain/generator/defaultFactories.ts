import faker from "faker";

import { GraphQLFactory } from "./config";

export const DEFAULT_FACTORIES: Record<string, GraphQLFactory> = {
  String: (context) => {
    switch (context.targetName.toLowerCase()) {
      case "email":
      case "emails":
      case "mail":
      case "mails":
        return "test-email@yourcompany.com";
      case "fullname":
      case "fullnames":
        return "John Doe";
      case "firstname":
      case "firstnames":
        return "John";
      case "lastname":
      case "lastnames":
        return "Doe";
      case "job":
      case "jobs":
      case "jobtitle":
      case "jobtitles":
        return "Engineer";
      case "jobarea":
        return "Engineering";
      case "phone":
      case "phones":
        return "1+ 418-323-4236";
      case "country":
      case "countries":
        return "Canada";
      case "address":
      case "addresses":
        return "2832 Sesame Street";
      case "state":
      case "states":
        return "Quebec";
      case "city":
      case "cities":
        return "QC";
      case "zipcode":
      case "zipcodes":
        return "G1G43F";
      case "company":
      case "companies":
        return "ACME";
      case "department":
      case "departments":
        return "Engineering";
      case "date":
      case "dates":
      case "datetime":
      case "instant":
        return "2021-01-05T00:00:00.000Z";
      case "price":
      case "prices":
        return "500$";
      case "color":
      case "colors":
        return "#ffffff";
      case "product":
      case "products":
        return "Soup";
      case "material":
      case "materials":
        return "Wood";
      case "id":
      case "ids":
        return "08a16b83-9094-4e89-8c05-2ccadd5c1c7e";
      case "name":
      case "names":
        return "Some name";
      case "description":
      case "descriptions":
        return "Some description";
      default:
        return "abc";
    }
  },
  ID: () => faker.datatype.uuid(),
  Boolean: () => faker.datatype.boolean(),
  Int: (context) => {
    switch (context.targetName) {
      case "salary":
      case "salaries":
        return faker.datatype.number(200_000);
      case "age":
      case "ages":
        return faker.datatype.number(90);
      default:
        return faker.datatype.number(100);
    }
  },
  Float: () => faker.datatype.float(100),
};
