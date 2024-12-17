import { type IconType } from 'react-icons/lib'
import {
  SiAstro,
  SiC,
  SiCplusplus,
  SiCsharp,
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiJson,
  SiLatex,
  SiMarkdown,
  SiMdx,
  SiPython,
  SiTypescript,
  SiYaml,
} from 'react-icons/si'
import { FaQuestion } from 'react-icons/fa' // Иконка по умолчанию

// Задаём литеральные типы для ключей
const languageIcons = {
  astro: SiAstro,
  html: SiHtml5,
  css: SiCss3,
  javascript: SiJavascript,
  python: SiPython,
  c: SiC,
  'c++': SiCplusplus,
  'c#': SiCsharp,
  typescript: SiTypescript,
  markdown: SiMarkdown,
  mdx: SiMdx,
  json: SiJson,
  yaml: SiYaml,
  tex: SiLatex,
} as const

type LanguageKey = keyof typeof languageIcons

/**
 * Возвращает иконку для указанного языка.
 * @param language Название языка программирования или разметки.
 * @returns JSX элемент с иконкой или иконку по умолчанию, если язык не известен.
 */
export const getLanguageIcon = (language: string): JSX.Element => {
  const key = language.toLowerCase() as LanguageKey
  const Icon = languageIcons[key]
  return Icon ? <Icon /> : <FaQuestion /> // Возвращаем иконку-заглушку, если язык не найден
}
