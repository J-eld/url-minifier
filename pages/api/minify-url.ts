// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const ServerlessClient = require('serverless-postgres')
const { nanoid } = require('nanoid')

type Data = {
  miniURL?: string,
  error?: string,
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
    let url = req.body.longURL

    if (!url.startsWith('http')) {
        url = 'http://' + url
    }

    try {
        new URL(url)

    } catch (_) {
        return res.status(400).send({error: 'URL is invalid'})
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
