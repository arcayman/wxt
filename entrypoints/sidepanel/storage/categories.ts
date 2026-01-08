import type { Category } from '../types'
import { browser } from 'wxt/browser'
export async function getCategories(): Promise<Category[]> {
  const result = await browser.storage.sync.get('categories')
  const categories = result.categories

  if (Array.isArray(categories)) {
    return categories
  }

  return []
}

export async function saveCategories(categories: Category[]) {
  await browser.storage.sync.set({ categories })
}
