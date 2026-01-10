import { browser } from 'wxt/browser'

export type Category = {
  id: string
  name: string
  createdAt: number
}

const STORAGE_KEY = 'categories'

export async function getCategories(): Promise<Category[]> {
  const result = await browser.storage.sync.get(STORAGE_KEY)
  // Fix: Ensure we always return an array
  const categories = result[STORAGE_KEY]
  return Array.isArray(categories) ? categories : []
}

export async function saveCategories(categories: Category[]) {
  await browser.storage.sync.set({ [STORAGE_KEY]: categories })
  console.log('✅ Saved to sync storage:', categories)
}