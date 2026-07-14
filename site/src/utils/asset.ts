/** Путь к файлу из public/ с учётом base (GitHub Pages: /Gursa/) */
export function asset(path: string): string {
  const clean = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${clean}`
}
