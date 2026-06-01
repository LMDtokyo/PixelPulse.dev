import { getEntry } from 'astro:content'

const FALLBACK_AVATAR = '/static/logo.webp'

export async function parseAuthors(authors: string[]) {
  if (!authors || authors.length === 0) return []

  const parseAuthor = async (slug: string) => {
    try {
      const author = await getEntry('authors', slug)
      return {
        slug,
        name: author?.data?.name || slug,
        avatar: author?.data?.avatar || FALLBACK_AVATAR,
        isRegistered: !!author,
      }
    } catch (error) {
      console.error(`Error fetching author with slug ${slug}:`, error)
      return {
        slug,
        name: slug,
        avatar: FALLBACK_AVATAR,
        isRegistered: false,
      }
    }
  }

  return await Promise.all(authors.map(parseAuthor))
}
