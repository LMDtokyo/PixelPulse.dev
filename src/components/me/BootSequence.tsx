import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

type Props = { lines: string[] }

export default function BootSequence({ lines }: Props) {
  const [shown, setShown] = useState<string[]>([])
  const [current, setCurrent] = useState('')
  const [done, setDone] = useState(false)
  const skipRef = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(lines)
      setDone(true)
      return
    }

    let line = 0
    let char = 0
    let timer: number

    const tick = () => {
      if (skipRef.current) {
        setShown(lines)
        setCurrent('')
        setDone(true)
        return
      }
      if (line >= lines.length) {
        setDone(true)
        return
      }
      const text = lines[line]
      char++
      setCurrent(text.slice(0, char))
      if (char >= text.length) {
        setShown((s) => [...s, text])
        setCurrent('')
        line++
        char = 0
        timer = window.setTimeout(tick, 180)
      } else {
        timer = window.setTimeout(tick, 14)
      }
    }
    timer = window.setTimeout(tick, 250)
    return () => window.clearTimeout(timer)
  }, [lines])

  const ok = (t: string) =>
    t.includes('[ OK ]') || t.includes('granted') ? 'term-green' : 'term-dim'

  return (
    <div
      className="font-mono text-xs leading-relaxed sm:text-sm"
      aria-label="boot sequence"
      onClick={() => (skipRef.current = true)}
    >
      {shown.map((l, i) => (
        <p key={i} className={ok(l)}>
          {l}
        </p>
      ))}
      {!done && current && (
        <p className="term-dim">
          {current}
          <span className="term-cursor" />
        </p>
      )}
      {!done && (
        <button
          type="button"
          onClick={() => (skipRef.current = true)}
          className="mt-1 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          skip ▸
        </button>
      )}
    </div>
  )
}
