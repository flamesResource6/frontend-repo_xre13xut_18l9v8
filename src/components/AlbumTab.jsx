import { useEffect, useState } from 'react'
import { Heart, MessageCircle, SortAsc } from 'lucide-react'

export default function AlbumTab() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const url = new URL(window.location.href)
  const initialEvent = url.searchParams.get('event') || ''
  const [eventId, setEventId] = useState(initialEvent)
  const [items, setItems] = useState([])
  const [sort, setSort] = useState('time')
  const [userId] = useState('user-' + Math.random().toString(36).slice(2, 8))

  useEffect(() => {
    if (eventId) fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, sort])

  async function fetchItems() {
    const res = await fetch(`${baseUrl}/api/media/event/${eventId}?sort=${sort}`)
    const data = await res.json()
    setItems(data.items)
  }

  async function toggleLike(id) {
    const res = await fetch(`${baseUrl}/api/media/${id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    })
    if (res.ok) {
      fetchItems()
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-2xl shadow-sm p-3 border border-purple-100 flex items-center gap-2">
        <input value={eventId} onChange={(e)=>setEventId(e.target.value)} placeholder="Paste Event ID" className="flex-1 border rounded-lg px-3 py-2" />
        <button onClick={fetchItems} className="px-3 py-2 rounded-lg bg-purple-600 text-white">Load</button>
        <div className="ml-2 flex items-center gap-1 text-gray-600">
          <SortAsc size={18} />
          <select value={sort} onChange={(e)=>setSort(e.target.value)} className="border rounded-lg px-2 py-1">
            <option value="time">By time</option>
            <option value="participant">By participant</option>
            <option value="challenge">By challenge</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map(m => (
          <div key={m._id} className="bg-white rounded-xl overflow-hidden border border-purple-100">
            <img src={m.url} alt="media" className="w-full h-40 object-cover" />
            <div className="p-2 flex items-center justify-between text-sm">
              <button onClick={() => toggleLike(m._id)} className="flex items-center gap-1 text-gray-600 hover:text-purple-600">
                <Heart size={18} /> {m.likes_count || 0}
              </button>
              <a href={`/media/${m._id}`} className="flex items-center gap-1 text-gray-600 hover:text-purple-600">
                <MessageCircle size={18} /> {m.comments_count || 0}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
