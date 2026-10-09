import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import pg from 'pg'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })

await pool.query(`
  CREATE TABLE IF NOT EXISTS visits (
    id SERIAL PRIMARY KEY,
    visited_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`)

const app = new Hono()

app.post('/api/visits', async (c) => {
  await pool.query('INSERT INTO visits DEFAULT VALUES')
  const { rows } = await pool.query('SELECT count(*)::int AS count FROM visits')
  return c.json({ count: rows[0].count })
})

app.get('/api/visits', async (c) => {
  const { rows } = await pool.query('SELECT count(*)::int AS count FROM visits')
  return c.json({ count: rows[0].count })
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
