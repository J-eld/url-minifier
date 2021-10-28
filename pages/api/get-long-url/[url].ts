// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const ServerlessClient = require('serverless-postgres')

type Data = {
    longURL: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const client = new ServerlessClient({
        user: process.env.PGSQL_USER,
        host: process.env.PGSQL_HOST,
        database: process.env.PGSQL_DB,
        password: process.env.PGSQL_PASSWORD,
        port: process.env.PGSQL_PORT
    });
    await client.connect()

    const result = await client.query('SELECT long_url FROM "mini-url".urls WHERE mini_url = $1', [req.query.url])

    res.status(200).send({longURL: result.rows[0].long_url})

}
