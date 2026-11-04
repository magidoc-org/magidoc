<script lang="ts">
import {
  type GraphQLNamedType,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isObjectType,
  isScalarType,
  isUnionType,
} from 'graphql'
import AppTag from '../common/AppTag.svelte'

export let type: GraphQLNamedType

function getTypeString(): string {
  if (isScalarType(type)) return 'Scalar'
  if (isEnumType(type)) return 'Enum'
  if (isInterfaceType(type)) return 'Interface'
  if (isUnionType(type)) return 'Union'
  if (isObjectType(type)) return 'Object'
  if (isInputObjectType(type)) return 'Input Object'
  return 'Unknown'
}
</script>

<AppTag color="outline">{getTypeString()}</AppTag>
