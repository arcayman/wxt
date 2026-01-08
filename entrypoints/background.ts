import { browser } from 'wxt/browser'

export type Category = {
  id: string
  name: string
  createdAt: number
}

export default {
  main() {
    const CATEGORIES_KEY = 'categories'
    const ITEMS_KEY = 'saved_items'

    browser.sidePanel.setPanelBehavior({
      openPanelOnActionClick: true,
    })

    browser.runtime.onMessage.addListener(async (msg) => {
      // ===== CATEGORIES =====
      if (msg.type === 'GET_CATEGORIES') {
        const result = await browser.storage.sync.get(CATEGORIES_KEY)
        const categories =
          result[CATEGORIES_KEY] as Category[] | undefined
        return categories ?? []
      }

      if (msg.type === 'SET_CATEGORIES') {
        await browser.storage.sync.set({
          [CATEGORIES_KEY]: msg.payload,
        })
        return true
      }

      // ===== SAVED ITEMS =====
      if (msg.type === 'SAVE_ITEM') {
        const result = await browser.storage.sync.get(ITEMS_KEY)
        const items =
          (result[ITEMS_KEY] as any[] | undefined) ?? []

        const updated = [...items, msg.payload]

        await browser.storage.sync.set({
          [ITEMS_KEY]: updated,
        })

        return { ok: true }
      }
    })
  },
}
