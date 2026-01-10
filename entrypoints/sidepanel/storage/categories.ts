import { storage } from '#imports'

export type Category = {
  id: string
  name: string
  createdAt: number
}

export const categoriesStorage = storage.defineItem<Category[]>('sync:categories', {
  defaultValue: [],
})

export const itemsStorage = storage.defineItem<any[]>('sync:saved_items', {
  defaultValue: [],
})

// Optional: Keep these helper functions if other parts of your code use them
export async function getCategories(): Promise<Category[]> {
  return await categoriesStorage.getValue()
}

export async function saveCategories(categories: Category[]) {
  await categoriesStorage.setValue(categories)
}