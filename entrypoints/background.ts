import { browser } from 'wxt/browser'
import { storage } from '#imports'

export type Category = {
  id: string
  name: string
  createdAt: number
}

// Define storage items with type safety
const categoriesStorage = storage.defineItem<Category[]>('sync:categories', {
  defaultValue: [],
})

const itemsStorage = storage.defineItem<any[]>('sync:saved_items', {
  defaultValue: [],
})

export default {
  main() {
    // Tell Chrome how side panel works
    browser.sidePanel.setPanelBehavior({
      openPanelOnActionClick: true,
    })

    // Message listener
    browser.runtime.onMessage.addListener(async (msg) => {
      // ===== CATEGORIES =====
      if (msg.type === 'GET_CATEGORIES') {
        return await categoriesStorage.getValue()
      }

      if (msg.type === 'SET_CATEGORIES') {
        await categoriesStorage.setValue(msg.payload)
        return true
      }

      // ===== SAVED ITEMS =====
      if (msg.type === 'SAVE_ITEM') {
        const items = await itemsStorage.getValue()
        const updated = [...items, msg.payload]
        await itemsStorage.setValue(updated)
        return { ok: true }
      }
    })
  },
}