// Single source of truth for the /me terminal profile.

export type Skill = {
  name: string
  level: number // 0–100
  accent: 'green' | 'cyan' | 'amber'
}

export type ArsenalGroup = {
  label: string
  items: string[]
}

export type LogEntry = {
  hash: string
  msg: string
}

export type RoadmapItem = {
  done: boolean
  text: string
}

export const PROFILE = {
  handle: 'lizi',
  alias: 'LMDtokyo',
  host: 'pixelpulse',
  role: 'backend engineer · security researcher',
  location: 'somewhere in the matrix',
  status: 'cs student // year 4',
  summary:
    'Backend-инженер и security researcher. Строю надёжные сервисы (Spring Boot 3 / Java 21, Fastify) с real-time, безопасностью и наблюдаемостью — и ломаю чужие, чтобы понять, как их защитить.',
} as const

export const BOOT_LINES: string[] = [
  'establishing secure uplink to pixelpulse.dev ...',
  'handshake: x25519 / chacha20-poly1305 ......... [ OK ]',
  'verifying operator signature ................... [ OK ]',
  'mounting /home/lizi ............................ [ OK ]',
  'decrypting profile.img ......................... [ OK ]',
  'access granted — welcome, operator.',
]

export const SKILLS: Skill[] = [
  { name: 'Java 21 · Spring Boot 3', level: 90, accent: 'green' },
  { name: 'TypeScript · Next.js · React', level: 86, accent: 'cyan' },
  { name: 'Python (async · bots)', level: 84, accent: 'amber' },
  { name: 'C / C++', level: 80, accent: 'cyan' },
  { name: 'PostgreSQL · Redis', level: 82, accent: 'green' },
  { name: 'Security · CTF · RE', level: 78, accent: 'amber' },
]

export const ARSENAL: ArsenalGroup[] = [
  {
    label: 'backend',
    items: ['Spring Boot 3', 'Spring Security', 'Fastify', '.NET', 'WebSocket/STOMP'],
  },
  {
    label: 'frontend',
    items: ['Next.js 15', 'React 19', 'TailwindCSS', 'TanStack Query'],
  },
  {
    label: 'data · ops',
    items: ['PostgreSQL', 'Redis', 'Flyway', 'Docker', 'Nginx', 'Prometheus'],
  },
  {
    label: 'security',
    items: ['Kali', 'Wireshark', 'Burp Suite', 'Ghidra', 'JWT'],
  },
]

export const ACHIEVEMENTS: LogEntry[] = [
  { hash: 'a1f3c0d', msg: 'LunaMarket — gaming platform (Spring Boot 3 + Next.js 15)' },
  { hash: '7e2b9af', msg: 'Discord & Steam bot integrations (async Python)' },
  { hash: 'c4d81e6', msg: 'WebSocket/STOMP real-time + JWT/Spring Security auth' },
  { hash: 'b09f72a', msg: 'CTF: stego / crypto / reverse engineering / web' },
  { hash: 'fe5a134', msg: 'defensive RE — malware/cheat IOC extraction' },
]

export const ROADMAP: RoadmapItem[] = [
  { done: true, text: 'Spring Boot 3 / Java 21 — сервисы с real-time и кэшем' },
  { done: true, text: 'Next.js 15 / React 19 — SSR-фронтенд + BFF-прокси' },
  { done: false, text: 'observability — Prometheus / Grafana, distributed tracing' },
  { done: false, text: 'security hardening — threat modeling, rate limiting, secrets' },
]

export const MISSION =
  'Мы чиним чужие сервисы патчами, но самые сложные 0-day — внутри себя. — Lizi'

export type SocialLink = { cmd: string; label: string; href: string }

export const SOCIALS: SocialLink[] = [
  { cmd: 'github', label: 'github.com/LMDtokyo', href: 'https://github.com/LMDtokyo' },
  { cmd: 'twitter', label: 'twitter.com/LMDtokyo', href: 'https://twitter.com/LMDtokyo' },
  { cmd: 'mail', label: 'LMDtokyo@proton.me', href: 'mailto:LMDtokyo@proton.me' },
]

export const ACCENT_CLASS: Record<Skill['accent'], string> = {
  green: 'term-green',
  cyan: 'term-cyan',
  amber: 'term-amber',
}

// Terminal command sections — also used to build the table of contents.
export type TermSection = { id: string; cmd: string }
export const TERM_SECTIONS: TermSection[] = [
  { id: 'whoami', cmd: 'whoami' },
  { id: 'skills', cmd: 'cat ./skills.json' },
  { id: 'arsenal', cmd: 'ls -la ./arsenal' },
  { id: 'log', cmd: 'git log --oneline' },
  { id: 'roadmap', cmd: 'cat ./roadmap.md' },
  { id: 'mission', cmd: './mission --statement' },
  { id: 'writeup', cmd: 'cat ./full-writeup.md' },
  { id: 'shell', cmd: './shell' },
]
