export async function onRequestGet(context) {
  const { request, env } = context
  const url = new URL(request.url)
  const type = url.searchParams.get('type')

  let query = 'SELECT * FROM plans'
  const params = []

  if (type) {
    query += ' WHERE type = ?1'
    params.push(type)
  }

  query += ' ORDER BY created_at DESC'

  const stmt = env.DB.prepare(query)
  const { results } = await stmt.bind(...params).all()

  return Response.json(results)
}

export async function onRequestPost(context) {
  const { request, env } = context
  const { content, type, color } = await request.json()

  const stmt = env.DB.prepare(
    'INSERT INTO plans (content, type, color) VALUES (?1, ?2, ?3)'
  )
  const result = await stmt.bind(content, type, color).run()

  return Response.json({
    id: result.meta.last_row_id,
    content,
    type,
    color,
    completed: 0,
    created_at: new Date().toISOString()
  })
}

export async function onRequestPatch(context) {
  const { request, env } = context
  const id = context.params.id

  const plan = await env.DB.prepare('SELECT * FROM plans WHERE id = ?1')
    .bind(id).first()

  if (!plan) return new Response('Not found', { status: 404 })

  const newCompleted = plan.completed ? 0 : 1
  const completedAt = newCompleted ? new Date().toISOString() : null

  await env.DB.prepare(
    'UPDATE plans SET completed = ?1, completed_at = ?2 WHERE id = ?3'
  ).bind(newCompleted, completedAt, id).run()

  return new Response(null, { status: 204 })
}

export async function onRequestDelete(context) {
  const { env } = context
  const id = context.params.id

  await env.DB.prepare('DELETE FROM plans WHERE id = ?1').bind(id).run()

  return new Response(null, { status: 204 })
}
