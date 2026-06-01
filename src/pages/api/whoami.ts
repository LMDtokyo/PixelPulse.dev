import type { APIRoute } from 'astro'

export const prerender = false

const dec = (value: string | null) => {
  if (!value) return ''
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export const GET: APIRoute = ({ request }) => {
  const h = request.headers
  const ip = (h.get('x-forwarded-for') || '').split(',')[0].trim()

  const data = {
    ip: ip || 'localhost',
    city: dec(h.get('x-vercel-ip-city')) || 'dev',
    region: dec(h.get('x-vercel-ip-country-region')),
    country: h.get('x-vercel-ip-country') || 'LO',
    lat: h.get('x-vercel-ip-latitude') || '',
    lon: h.get('x-vercel-ip-longitude') || '',
    tz: dec(h.get('x-vercel-ip-timezone')),
    ua: h.get('user-agent') || 'unknown',
  }

  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  })
}
