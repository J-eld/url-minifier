// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const ServerlessClient = require('serverless-postgres')
const { nanoid } = require('nanoid')

type Data = {
  miniURL: string
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

    let id =  await nanoid(7)
    let url;

    try {
        new URL(req.body.longURL)
        url = req.body.longURL

    } catch (err) {
        url = 'http://' + req.body.longURL
    }

    while(true) {
        try {
            await client.query('INSERT INTO "mini-url".urls(long_url, mini_url) VALUES($1, $2)', [url, id])
            res.status(200).send({miniURL: id})
            break
        } catch (err) {
            id = await nanoid(7)
        }
    }
}
