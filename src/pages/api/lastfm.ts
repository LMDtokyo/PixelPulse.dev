import type { APIRoute } from 'astro'

export const prerender = false

const LASTFM_USER = 'lmdtokyo'

export const GET: APIRoute = async () => {
  const apiKey = import.meta.env.LASTFM_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'LASTFM_API_KEY not set' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${apiKey}&format=json&limit=1`

  const upstream = await fetch(url)
  const body = await upstream.text()

  return new Response(body, {
    status: upstream.status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=30',
    },
  })
}
