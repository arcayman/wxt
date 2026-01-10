import { useEffect, useState } from 'react'
import { browser } from 'wxt/browser'
import { getCategories, saveCategories, type Category } from './storage/categories'

// Add this type back
type SavedItemsProps = {
    onNavigate: (route: 'home' | 'saved') => void
}

export function SavedItems({ }: SavedItemsProps) {
    const [categories, setCategories] = useState<Category[]>([])
    const [name, setName] = useState('')

    useEffect(() => {
        getCategories().then((cats) => {
            console.log('📦 Categories loaded:', cats)
            setCategories(cats)
        })

        // Listen for changes from any device
        const listener = (changes: any, areaName: string) => {
            console.log('🔔 Storage changed:', { changes, areaName })
            if (areaName === 'sync' && changes.categories) {
                console.log('🌐 Categories synced from another device:', changes.categories.newValue)
                setCategories(changes.categories.newValue || [])
            }
        }
        browser.storage.onChanged.addListener(listener)

        return () => {
            browser.storage.onChanged.removeListener(listener)
        }
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
    async function debugStorage() {
        const syncData = await browser.storage.sync.get(null)
        console.log('🔍 ALL sync storage keys:', Object.keys(syncData))
        console.log('🔍 Full sync storage:', syncData)

        const cats = await getCategories()
        console.log('🔍 Categories:', cats)
    }

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Categories</h2>
            <div className="flex gap-2">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCategory()}
                    placeholder="New category"
                    className="flex-1 px-2 py-1 text-white rounded border border-blue-200 h-8"
                />
                <button
                    onClick={addCategory}
                    className="px-3 py-1 bg-blue-600 rounded text-sm"
                >
                    Add
                </button>
                <button
                    onClick={debugStorage}
                    className="px-3 py-1 bg-gray-600 rounded text-sm"
                >
                    Debug
                </button>

            </div>
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