import { InvalidArgumentError } from 'commander'

export type KeyValue = {
  name: string
  value: string
}

export function parseKeyValuePair(value: string): KeyValue {
  const regex = /^(?<name>[a-z0-9-]+)=(?<value>.+)$/i
  const result = value.match(regex)
  if (!result?.groups) {
    throw new InvalidArgumentError('Value must match the format <name>=<value>')
  }

  return {
    name: result.groups.name,
    value: result.groups.value,
  }
}
