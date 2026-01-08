export type SavedItem = {
    id: string
    platform?: 'x' | 'facebook' | 'unknown'
    type?: 'video' | 'post'
    title?: string
    text?: string
    url: string
    categoryId : string | null
    createdAt: number
}

export type Category = {
  id: string
  name: string
  createdAt: number
}
