<script lang="ts">
  import { Tag } from 'carbon-components-svelte'
  import {
    isEnumType,
    isInputObjectType,
    isInterfaceType,
    isScalarType,
    isUnionType,
    isObjectType,
    type GraphQLNamedType,
  } from 'graphql'

  export let type: GraphQLNamedType

  function getTypeString(): string {
    if (isScalarType(type)) {
      return 'Scalar'
    } else if (isEnumType(type)) {
      return 'Enum'
    } else if (isInterfaceType(type)) {
      return 'Interface'
    } else if (isUnionType(type)) {
      return 'Union'
    } else if (isObjectType(type)) {
      return 'Object'
    } else if (isInputObjectType(type)) {
      return 'Input Object'
    }

    return 'Unknown'
  }
</script>

<Tag type="teal">{getTypeString()}</Tag>
