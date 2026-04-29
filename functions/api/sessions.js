export async function onRequestPost(context) {
  const { request, env } = context
  const { type, duration } = await request.json()

  const stmt = env.DB.prepare(
    'INSERT INTO sessions (type, duration) VALUES (?1, ?2)'
  )
  const result = await stmt.bind(type, duration).run()

  return Response.json({ id: result.meta.last_row_id, type, duration })
}

export async function onRequestGet(context) {
  const { env } = context
  const stmt = env.DB.prepare(
    'SELECT * FROM sessions ORDER BY completed_at DESC LIMIT 100'
  )
  const { results } = await stmt.all()

  return Response.json(results)
}
