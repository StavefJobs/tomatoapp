export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)

  if (url.pathname.startsWith('/api/')) {
    return new Response('Not found', { status: 404 })
  }

  return env.ASSETS.fetch(request)
}
