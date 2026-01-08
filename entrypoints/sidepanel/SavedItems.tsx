import { useEffect, useState } from 'react'
import type { Category } from './types'
import { getCategories, saveCategories } from './storage/categories'

type SavedItemsProps = {
    onNavigate: (route: 'home' | 'saved') => void
}

export function SavedItems({ }: SavedItemsProps) {
    const [categories, setCategories] = useState<Category[]>([])
    const [name, setName] = useState('')

    // load once (sync)
   useEffect(() => {
  browser.runtime
    .sendMessage({ type: 'GET_CATEGORIES' })
    .then(setCategories)
}, [])
    async function addCategory() {
        if (!name.trim()) return

        const newCategory: Category = {
            id: crypto.randomUUID(),
            name: name.trim(),
            createdAt: Date.now(),
        }
        const updated = [...categories, newCategory]
        setCategories(updated)
        setName('')
        await saveCategories(updated)
    }
    return (
        <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">
                Categories
            </h2>
            {/* Create category */}
            <div className="flex gap-2">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="New category"
                    className="flex-1 px-2 py-1 text-white rounded border border-blue-200 h-8"
                />
                <button
                    onClick={addCategory}
                    className="px-3 py-1 bg-blue-600 rounded text-sm"
                >
                    Add
                </button>
            </div>
            {/*search index*/}
            <div className="flex gap-2">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="New category"
                    className="flex-1 px-2 py-1 text-white rounded border border-blue-200 h-8"
                />
                <button
                    onClick={addCategory}
                    className="px-3 py-1 bg-blue-600 rounded text-sm"
                >
                    Search
                </button>
            </div>
            {/* Category list */}
            <ul className="space-y-1">
                {categories.map((cat) => (
                    <li
                        key={cat.id}
                        className="px-2 py-1 bg-gray-800 rounded text-sm font-semibold h-8"
                    >
                        {cat.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
