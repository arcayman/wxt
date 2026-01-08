// sidepanel/components/AddItem.tsx
import { useState } from 'react'
import { browser } from 'wxt/browser'
import type { SavedItem } from '@/types/messages'

export function AddItem({ categories }: { categories: any[] }) {
  const [url, setUrl] = useState('')
  const [categoryId, setCategoryId] = useState<string | null>(null)

  async function save() {
    if (!url) return

    const item: SavedItem = {
      id: crypto.randomUUID(),
      url,
      categoryId,
      createdAt: Date.now(),
    }

    await browser.runtime.sendMessage({
      type: 'SAVE_ITEM',
      payload: item,
    })

    setUrl('')
  }

  return (
    <div className="space-y-2 border border-gray-600 p-2 rounded">
      <input
        className="w-full bg-black border border-gray-500 px-2 py-1"
        placeholder="Paste URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <select
        className="w-full bg-black border border-gray-500 px-2 py-1"
        onChange={(e) =>
          setCategoryId(e.target.value || null)
        }
      >
        <option value="">General</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button
        className="w-full bg-white text-black py-1"
        onClick={save}
      >
        Save
      </button>
    </div>
  )
}
