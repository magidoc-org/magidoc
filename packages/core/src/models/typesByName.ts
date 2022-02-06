import { GraphQLIntrospectionResult, FullType } from "./introspection";
import _ from "lodash";

export type TypesByName = Record<string, FullType>;

export function introspectionResultToTypesByName(
  result: GraphQLIntrospectionResult
): TypesByName {
  return _.keyBy(result.__schema.types, (type: FullType) => type.name);
}
