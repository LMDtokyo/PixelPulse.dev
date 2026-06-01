![Showcase Card](/public/static/showcase-card.png)

<div align="center">

## PixelPulse.dev

[![Stargazers]](https://github.com/LMDtokyo/PixelPulse.dev/stargazers)
[![Code License]](LICENSE.md)
[![Content License]](LICENSE.content.md)

**English** · [Русский](#русский)

</div>

---

[PixelPulse.dev](https://pixel-pulse-dev-nig4.vercel.app) is my personal frontend & information-security blog — built with [Astro](https://astro.build/), [Tailwind](https://tailwindcss.com/), and [shadcn/ui](https://ui.shadcn.com/).

## Technology Stack

| Category            | Technology                                                                                         |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| Framework           | [Astro](https://astro.build/)                                                                      |
| Styling             | [Tailwind](https://tailwindcss.com)                                                                |
| Components          | [shadcn/ui](https://ui.shadcn.com/)                                                                |
| Content             | [MDX](https://mdxjs.com/)                                                                           |
| Syntax Highlighting | [Shiki](https://github.com/shikijs/shiki) + [rehype-pretty-code](https://rehype-pretty.pages.dev/) |
| Deployment          | [Vercel](https://vercel.com)                                                                       |

## Getting Started

```bash
npm install          # install dependencies
npm run dev          # start dev server at http://localhost:1234
npm run build        # production build
npm run preview      # preview the production build
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your keys:

| Variable          | Description                                                          |
| ----------------- | ------------------------------------------------------------------- |
| `LASTFM_API_KEY`  | Last.fm API key, used by the `/api/lastfm` endpoint (Spotify card). |

On Vercel, add the same variables under **Project → Settings → Environment Variables**.

## Licensing

- **Code** — proprietary, all rights reserved. Public for viewing/reference only. See [LICENSE.md](LICENSE.md).
- **Content** — [CC BY-NC-ND 4.0](LICENSE.content.md).
- **Template** — bootstrapped from the MIT-licensed [astro-micro](https://github.com/trevortylerlee/astro-micro); its license is retained in [LICENSE.md](LICENSE.md).

For permissions, contact [LMDtokyo@proton.me](mailto:LMDtokyo@proton.me).

---

<a name="русский"></a>

## Русский

[Русский](#русский) · [English](#pixelpulsedev)

[PixelPulse.dev](https://pixel-pulse-dev-nig4.vercel.app) — мой личный блог о фронтенде и информационной безопасности. Собран на [Astro](https://astro.build/), [Tailwind](https://tailwindcss.com/) и [shadcn/ui](https://ui.shadcn.com/).

### Стек технологий

| Категория            | Технология                                                                                         |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| Фреймворк            | [Astro](https://astro.build/)                                                                      |
| Стили                | [Tailwind](https://tailwindcss.com)                                                                |
| Компоненты           | [shadcn/ui](https://ui.shadcn.com/)                                                                |
| Контент              | [MDX](https://mdxjs.com/)                                                                           |
| Подсветка синтаксиса | [Shiki](https://github.com/shikijs/shiki) + [rehype-pretty-code](https://rehype-pretty.pages.dev/) |
| Деплой               | [Vercel](https://vercel.com)                                                                       |

### Запуск

```bash
npm install          # установить зависимости
npm run dev          # дев-сервер на http://localhost:1234
npm run build        # продакшн-сборка
npm run preview      # предпросмотр продакшн-сборки
```

### Переменные окружения

Скопируй `.env.example` в `.env` и заполни ключи:

| Переменная        | Описание                                                              |
| ----------------- | --------------------------------------------------------------------- |
| `LASTFM_API_KEY`  | Ключ API Last.fm, используется эндпоинтом `/api/lastfm` (карточка музыки). |

На Vercel те же переменные добавляются в **Project → Settings → Environment Variables**.

### Лицензии

- **Код** — проприетарный, все права защищены. Опубликован только для просмотра и справки. См. [LICENSE.md](LICENSE.md).
- **Контент** — [CC BY-NC-ND 4.0](LICENSE.content.md).
- **Шаблон** — основан на MIT-шаблоне [astro-micro](https://github.com/trevortylerlee/astro-micro); его лицензия сохранена в [LICENSE.md](LICENSE.md).

По вопросам разрешений: [LMDtokyo@proton.me](mailto:LMDtokyo@proton.me).

---

Made with ♥ by [PixelPulse](https://pixel-pulse-dev-nig4.vercel.app)

[Stargazers]: https://img.shields.io/github/stars/LMDtokyo/PixelPulse.dev?color=463f37&logo=github&logoColor=fff&style=for-the-badge
[Code License]: https://img.shields.io/badge/code%20license-proprietary-5d5449?style=for-the-badge&logo=github&logoColor=fff
[Content License]: https://img.shields.io/badge/content%20license-CC%20BY--NC--ND%204.0-756a5b?style=for-the-badge&logo=creativecommons&logoColor=fff
