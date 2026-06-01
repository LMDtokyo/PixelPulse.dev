export function sortByDate<T extends { data: { date: Date } }>(posts: T[]): T[] {
  return [...posts].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  )
}

export function getAdjacentPosts<T extends { slug: string }>(
  posts: T[],
  slug: string,
): { prev: T | null; next: T | null } {
  const index = posts.findIndex((post) => post.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    next: index > 0 ? posts[index - 1] : null,
    prev: index < posts.length - 1 ? posts[index + 1] : null,
  }
}
