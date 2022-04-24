export default {
  introspection: {
    type: 'url',
    url: 'https://graphql.fauna.com/graphql',
    query:
      'query IntrospectionQuery{__schema{queryType{name}mutationType{name}subscriptionType{name}types{...FullType}directives{name description locations args{...InputValue}}}}fragment FullType on __Type{kind name description fields{name description args{...InputValue}type{...TypeRef}}inputFields{...InputValue}interfaces{...TypeRef}enumValues{name description}possibleTypes{...TypeRef}}fragment InputValue on __InputValue{name description type{...TypeRef}defaultValue}fragment TypeRef on __Type{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name}}}}}}}}',
    headers: {
      // https://fauna.com/blog/try-faunadbs-graphql-api 
      // Those are public credentials
      Authorization: `Basic Zm5BRFFVdWNRb0FDQ1VpZDAxeXVIdWt2SnptaVY4STI4a2R6Y0p2UDo=`,
    },
  },
  website: {
    template: 'carbon-multi-page',
    options: {
      appTitle: 'FaunaDB',
    },
  },
}
