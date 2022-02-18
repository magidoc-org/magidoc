const { buildClientSchema } = require('graphql')
const schema = require('./_schema.json')

global.getTestSchema = () => buildClientSchema(schema)
