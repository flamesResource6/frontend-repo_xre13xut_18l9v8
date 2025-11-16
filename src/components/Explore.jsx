import { useEffect, useState } from 'react'

const api = (path) => `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}${path}`

export default function Explore({ onOpen }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchExplore()
  }, [])

  const fetchExplore = async () => {
    const res = await fetch(api('/api/explore'))
    if (res.ok) setItems(await res.json())
  }

  return (
    <div>
      <h3 className="font-semibold mb-3">Explore public journeys</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map(ev => (
          <button key={ev.id} onClick={() => onOpen && onOpen(ev)} className="text-left bg-white rounded-xl border overflow-hidden">
            <img src={ev.cover_url || `https://picsum.photos/seed/${ev.id}/400/300`} alt="cover" className="w-full h-32 object-cover" />
            <div className="p-2">
              <div className="font-medium text-sm truncate">{ev.title}</div>
              <div className="text-xs text-gray-600">{ev.location || 'Unknown'} • {ev.participants_count} joined</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
