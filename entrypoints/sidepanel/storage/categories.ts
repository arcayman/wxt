import { browser } from 'wxt/browser'

export type Category = {
  id: string
  name: string
  createdAt: number
}

const STORAGE_KEY = 'categories'

export async function getCategories(): Promise<Category[]> {
  const result = await browser.storage.sync.get(STORAGE_KEY) as Record<string, any>
  const categories = result[STORAGE_KEY]
  
  if (Array.isArray(categories)) {
    return categories as Category[]
  }
  
  return []
}

export async function saveCategories(categories: Category[]): Promise<void> {
  await browser.storage.sync.set({ [STORAGE_KEY]: categories })
  console.log('✅ Saved to sync storage:', categories)
}