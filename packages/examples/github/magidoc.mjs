export default {
  introspection: {
    type: 'url',
    url: 'https://api.github.com/graphql',
    query:
      'query IntrospectionQuery{__schema{queryType{name}mutationType{name}subscriptionType{name}types{...FullType}directives{name description locations args(includeDeprecated:true){...InputValue}}}}fragment FullType on __Type{kind name description fields(includeDeprecated:true){name description args(includeDeprecated:true){...InputValue}type{...TypeRef}isDeprecated deprecationReason}inputFields(includeDeprecated:true){...InputValue}interfaces{...TypeRef}enumValues(includeDeprecated:true){name description isDeprecated deprecationReason}possibleTypes{...TypeRef}}fragment InputValue on __InputValue{name description type{...TypeRef}defaultValue isDeprecated deprecationReason}fragment TypeRef on __Type{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name}}}}}}}}',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  },
  website: {
    template: 'carbon-multi-page',
    options: {
      appTitle: 'PokéAPI',
      appLogo:
        'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi.svg?sanitize=true',
    },
  },
}
