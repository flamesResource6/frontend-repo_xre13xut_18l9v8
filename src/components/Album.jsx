import { useEffect, useState } from 'react'
import { Heart, MessageSquare } from 'lucide-react'

const api = (path) => `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}${path}`

export default function Album({ currentEvent }) {
  const [items, setItems] = useState([])
  const [sort, setSort] = useState('time')

  useEffect(() => {
    if (currentEvent?.id) fetchAlbum(currentEvent.id, sort)
  }, [currentEvent, sort])

  const fetchAlbum = async (eventId, sortBy) => {
    const res = await fetch(api(`/api/events/${eventId}/album?sort=${sortBy}`))
    if (res.ok) {
      const data = await res.json()
      setItems(data.media)
    }
  }

  const toggleLike = async (id) => {
    const user_id = localStorage.getItem('su_user')
    await fetch(api(`/api/media/${id}/like`), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id }) })
    // refresh likes
    setItems(items => items.map(i => i.id === id ? { ...i, likes_count: (i.likes_count||0) + 1 } : i))
  }

  const addComment = async (id, text) => {
    const user_id = localStorage.getItem('su_user')
    await fetch(api(`/api/media/${id}/comments`), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id, text }) })
    setItems(items => items.map(i => i.id === id ? { ...i, comments_count: (i.comments_count||0) + 1 } : i))
  }

  if (!currentEvent) return <div className="text-gray-600">Join an event to view its album.</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Shared Album</h3>
        <select value={sort} onChange={e=>setSort(e.target.value)} className="border rounded-lg px-2 py-1 text-sm">
          <option value="time">By time</option>
          <option value="participant">By participant</option>
          <option value="challenge">By challenge</option>
        </select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-xl border overflow-hidden">
            <img src={item.url} alt="media" className="w-full h-40 object-cover" />
            <div className="p-2 flex items-center justify-between text-sm">
              <button onClick={() => toggleLike(item.id)} className="flex items-center gap-1 text-gray-700 hover:text-pink-600"><Heart size={16}/> {item.likes_count || 0}</button>
              <button onClick={() => {
                const text = prompt('Add a comment')
                if (text) addComment(item.id, text)
              }} className="flex items-center gap-1 text-gray-700 hover:text-blue-600"><MessageSquare size={16}/> {item.comments_count || 0}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
