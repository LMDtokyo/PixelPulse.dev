import { useEffect, useRef, useState } from 'react'

type Stats = { fps: number; cpu: number; mem: number; net: string; down: number }

function Gauge({ label, value, max, unit }: {
  label: string
  value: number
  max: number
  unit?: string
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const hot = pct > 80
  return (
    <div className="flex items-center gap-2">
      <span className="w-7 text-muted-foreground">{label}</span>
      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
        <span
          className="block h-full rounded-full transition-[width] duration-300"
          style={{
            width: `${pct}%`,
            background: hot
              ? 'hsl(var(--destructive))'
              : 'linear-gradient(90deg, hsl(var(--term-green)), hsl(var(--term-cyan)))',
          }}
        />
      </span>
      <span className="w-12 text-right tabular-nums text-foreground">
        {value}
        {unit}
      </span>
    </div>
  )
}

export default function HudStats() {
  const [open, setOpen] = useState(true)
  const [stats, setStats] = useState<Stats>({
    fps: 60, cpu: 12, mem: 0, net: '—', down: 0,
  })
  const cpuRef = useRef(12)

  useEffect(() => {
    let frames = 0
    let last = performance.now()
    let raf = 0
    let fps = 60

    const loop = (now: number) => {
      frames++
      if (now - last >= 1000) {
        fps = frames
        frames = 0
        last = now
        const target = Math.min(100, Math.max(4, 100 - (fps / 60) * 82))
        cpuRef.current = Math.round(cpuRef.current * 0.6 + target * 0.4)
        setStats((s) => ({ ...s, fps, cpu: cpuRef.current }))
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const sample = () => {
      const conn = (navigator as any).connection
      const mem = (performance as any).memory
      setStats((s) => ({
        ...s,
        net: conn?.effectiveType ?? 'wifi',
        down: conn?.downlink ? Math.round(conn.downlink) : 0,
        mem: mem
          ? Math.round((mem.usedJSHeapSize / mem.jsHeapSizeLimit) * 100)
          : s.mem,
      }))
    }
    sample()
    const id = setInterval(sample, 1500)

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(id)
    }
  }, [])

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Show system monitor"
        className="fixed bottom-4 left-4 z-40 hidden rounded-md border border-border bg-background/80 px-2 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur transition-colors hover:text-primary sm:block"
      >
        ▣ sys
      </button>
    )
  }

  return (
    <div
      className="hud-stats fixed bottom-4 left-4 z-40 hidden w-56 rounded-md border border-border bg-background/80 p-3 font-mono text-[11px] backdrop-blur sm:block"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="tracking-widest text-primary">SYSTEM</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Hide system monitor"
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          ─
        </button>
      </div>
      <div className="space-y-1.5">
        <Gauge label="fps" value={stats.fps} max={120} />
        <Gauge label="cpu" value={stats.cpu} max={100} unit="%" />
        <Gauge label="mem" value={stats.mem} max={100} unit="%" />
        <div className="flex items-center gap-2">
          <span className="w-7 text-muted-foreground">net</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-[hsl(var(--term-green))]" />
            <span className="text-foreground">{stats.net}</span>
            {stats.down ? (
              <span className="text-muted-foreground">{stats.down}mbps</span>
            ) : null}
          </span>
        </div>
      </div>
    </div>
  )
}
