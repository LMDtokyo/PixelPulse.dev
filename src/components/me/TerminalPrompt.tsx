import { useRef, useState } from 'react'

type Social = { cmd: string; label: string; href: string }
type Props = {
  user: string
  host: string
  summary: string
  skills: string[]
  socials: Social[]
}

type Line = { kind: 'in' | 'out' | 'err' | 'link'; text: string; href?: string }

export default function TerminalPrompt({
  user,
  host,
  summary,
  skills,
  socials,
}: Props) {
  const [history, setHistory] = useState<Line[]>([
    { kind: 'out', text: "type 'help' to list available commands." },
  ])
  const [value, setValue] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const COMMANDS = ['help', 'whoami', 'skills', 'social', 'banner', 'clear']

  const run = (raw: string): Line[] => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return []
    switch (cmd) {
      case 'help':
        return [{ kind: 'out', text: `available: ${COMMANDS.join('  ')}` }]
      case 'whoami':
        return [{ kind: 'out', text: summary }]
      case 'skills':
        return skills.map((s) => ({ kind: 'out', text: `• ${s}` }))
      case 'social':
        return socials.map((s) => ({
          kind: 'link',
          text: `${s.cmd.padEnd(8)} ${s.label}`,
          href: s.href,
        }))
      case 'banner':
        return [{ kind: 'out', text: `${user}@${host} // access granted` }]
      case 'sudo':
      case 'sudo su':
        return [{ kind: 'err', text: 'nice try. operator is already root. 🔓' }]
      case 'clear':
        return [{ kind: 'out', text: '__CLEAR__' }]
      default:
        return [{ kind: 'err', text: `command not found: ${cmd} — try 'help'` }]
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const out = run(value)
    if (out.some((l) => l.text === '__CLEAR__')) {
      setHistory([])
      setValue('')
      return
    }
    setHistory((h) => [...h, { kind: 'in', text: value }, ...out])
    setValue('')
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
    })
  }

  return (
    <div className="font-mono text-xs sm:text-sm">
      <div
        ref={scrollRef}
        className="max-h-48 space-y-1 overflow-y-auto"
        role="log"
        aria-live="polite"
      >
        {history.map((l, i) =>
          l.kind === 'in' ? (
            <p key={i}>
              <span className="text-muted-foreground">$ </span>
              <span className="term-amber">{l.text}</span>
            </p>
          ) : l.kind === 'err' ? (
            <p key={i} className="text-[hsl(0_70%_62%)]">
              {l.text}
            </p>
          ) : l.kind === 'link' ? (
            <a
              key={i}
              href={l.href}
              target="_blank"
              rel="noreferrer noopener"
              className="block term-cyan underline-offset-2 hover:underline"
            >
              {l.text}
            </a>
          ) : (
            <p key={i} className="term-dim">
              {l.text}
            </p>
          ),
        )}
      </div>

      <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2">
        <label htmlFor="term-input" className="text-muted-foreground">
          <span className="term-green">{user}</span>@
          <span className="term-cyan">{host}</span>:~$
        </label>
        <input
          id="term-input"
          name="term-input"
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="terminal command input"
          className="flex-grow bg-transparent text-foreground caret-transparent outline-none placeholder:text-muted-foreground/50"
          placeholder="help"
        />
        <span className="term-caret" aria-hidden="true" />
      </form>
    </div>
  )
}
