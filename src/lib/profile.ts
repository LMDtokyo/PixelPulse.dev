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
  handle: 'lmdtokyo',
  alias: 'NoMercy',
  host: 'pixelpulse',
  role: 'hacker · pentester · full-stack',
  location: 'Los Angeles',
  status: 'student // 2nd year',
  summary:
    'Полный цикл: от низкоуровневых сетевых компонентов и реверс-инжиниринга до фронтенд-интерфейсов и инфраструктуры — с безопасностью на каждом этапе.',
} as const

export const BOOT_LINES: string[] = [
  'establishing secure uplink to pixelpulse.dev ...',
  'handshake: x25519 / chacha20-poly1305 ......... [ OK ]',
  'verifying operator signature ................... [ OK ]',
  'mounting /home/lmdtokyo ........................ [ OK ]',
  'decrypting profile.img ......................... [ OK ]',
  'access granted — welcome, operator.',
]

export const SKILLS: Skill[] = [
  { name: 'C++ / Rust', level: 88, accent: 'cyan' },
  { name: 'C# / .NET', level: 82, accent: 'green' },
  { name: 'Python', level: 90, accent: 'amber' },
  { name: 'TypeScript · React · Astro', level: 85, accent: 'green' },
  { name: 'Reverse Engineering', level: 78, accent: 'cyan' },
  { name: 'Pentesting · OSINT', level: 80, accent: 'amber' },
]

export const ARSENAL: ArsenalGroup[] = [
  {
    label: 'offense',
    items: ['Kali', 'Nmap', 'Burp Suite', 'Wireshark', 'sqlmap', 'Metasploit'],
  },
  {
    label: 'reversing',
    items: ['Ghidra', 'IDA Pro', 'x64dbg', 'dnSpyEx', 'Detect It Easy'],
  },
  {
    label: 'build · ops',
    items: ['Git', 'Docker', 'CI/CD', 'PostgreSQL', 'Redis', 'Nginx'],
  },
]

export const ACHIEVEMENTS: LogEntry[] = [
  { hash: 'a1f3c0d', msg: 'CTF: stego / crypto / RE / web exploitation' },
  { hash: '7e2b9af', msg: 'RE: binary analysis in Ghidra & IDA Pro' },
  { hash: 'c4d81e6', msg: 'recon: nmap + sqlmap + metasploit pipelines' },
  { hash: 'b09f72a', msg: 'defensive RE: malware/cheat IOC extraction' },
  { hash: 'fe5a134', msg: 'building LunaMarket — Spring Boot 3 + Next.js' },
]

export const ROADMAP: RoadmapItem[] = [
  { done: true, text: 'systems Rust — безопасные сетевые сервисы' },
  { done: true, text: 'hybrid frontend — Astro + React SSR' },
  { done: false, text: 'DevSecOps — автоматический SAST / DAST / SCA' },
  { done: false, text: 'cryptography — TLS, безопасная аутентификация, KMS' },
]

export const MISSION =
  'Безопасность — это не продукт, а непрерывный процесс познания. Не просто найти уязвимость, но понять её природу, устранить причину и поделиться знанием.'

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
