import express from 'express'
import { GraphQLService } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import { ApolloGateway } from '@apollo/gateway'

const gateway = <GraphQLService>new ApolloGateway({
  serviceList: [
    { name: 'users', url: 'http://localhost:3002/graphql' },
    { name: 'posts', url: 'http://localhost:3001/graphql' },
  ],
})

const server = new ApolloServer({ gateway, subscriptions: false })

const app = express()
const port = process.env.port || 3000

server.applyMiddleware({ app })

app.listen(port, () =>
  console.log(`ILM Gateway Service listening on port ${port}!`),
)
