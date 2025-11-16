import { useEffect, useState } from 'react'

export default function ExploreTab() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchExplore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchExplore() {
    const res = await fetch(`${baseUrl}/api/events/explore`)
    const data = await res.json()
    setEvents(data.events || [])
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {events.map(e => (
          <a key={e._id} href={`/album?event=${e._id}`} className="block bg-white rounded-xl overflow-hidden border border-purple-100 hover:shadow">
            <img src={e.cover_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop'} alt="cover" className="w-full h-36 object-cover" />
            <div className="p-2">
              <p className="font-medium truncate">{e.title}</p>
              <p className="text-xs text-gray-500">{e.location || '—'} • {e.participants_count || 0} joined</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
