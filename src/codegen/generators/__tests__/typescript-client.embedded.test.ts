import { buildSchema } from 'graphql'
import { TypescriptGenerator } from '../typescript-client'
import { test } from 'ava'
import generateCRUDSchemaString, {
  parseInternalTypes,
} from 'prisma-generate-schema'
import { DatabaseType } from 'prisma-datamodel'

const datamodel = `
type User {
  id: ID! @unique
  name: String!
  address: Address
}

type Address @embedded {
  location: String
}
`

test.skip('typescript generator - embedded', t => {
  //@ts-ignore
  const schema = buildSchema(generateCRUDSchemaString(datamodel, DatabaseType.postgres))
  const generator = new TypescriptGenerator({
    schema,
    //@ts-ignore
    internalTypes: parseInternalTypes(datamodel, DatabaseType.postgres).types,
  })
  const result = generator.render()
  t.snapshot(result)
})
