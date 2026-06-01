import { useEffect, useState } from 'react'

interface Track {
  name: string
  artist: { '#text': string }
  image: { '#text': string; size: string }[]
  url: string
  '@attr'?: { nowplaying: string }
}

export default function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let active = true
    const fetchData = () =>
      fetch('/api/lastfm')
        .then((res) => res.json())
        .then((data) => {
          if (!active) return
          setTrack(data?.recenttracks?.track?.[0] ?? null)
          setLoaded(true)
        })
        .catch(() => active && setLoaded(true))

    fetchData()
    const id = setInterval(fetchData, 30000)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [])

  if (!loaded)
    return <span className="text-muted-foreground/60">syncing…</span>
  if (!track) return <span className="text-muted-foreground/60">offline</span>

  const playing = track['@attr']?.nowplaying === 'true'
  const cover =
    track.image?.find((i) => i.size === 'medium')?.['#text'] ||
    track.image?.[1]?.['#text']

  const bars = Array.from({ length: 16 }, (_, i) => ({
    delay: `${((i * 97) % 800) / 1000}s`,
    duration: `${0.7 + (((i * 53) % 90) / 100)}s`,
  }))

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex max-w-[80vw] items-center gap-2.5 transition-colors hover:text-foreground"
    >
      {cover ? (
        <img
          src={cover}
          alt=""
          width={26}
          height={26}
          className="rounded border border-border grayscale"
        />
      ) : null}
      {playing ? (
        <span className="viz" aria-hidden="true">
          {bars.map((b, i) => (
            <i
              key={i}
              style={{ animationDelay: b.delay, animationDuration: b.duration }}
            />
          ))}
        </span>
      ) : (
        <span className="term-green" aria-hidden="true">
          ♪
        </span>
      )}
      <span className="truncate">
        <span className="term-green">
          {playing ? 'now playing' : 'last played'}
        </span>{' '}
        <span className="text-foreground">{track.name}</span>
        <span className="text-muted-foreground"> · {track.artist['#text']}</span>
      </span>
    </a>
  )
}
