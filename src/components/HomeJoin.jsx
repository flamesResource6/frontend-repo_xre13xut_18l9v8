import { useState } from 'react'
import { QrCode, Camera, Users, Share2 } from 'lucide-react'

const api = (path) => `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}${path}`

export default function HomeJoin({ onJoined }) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [event, setEvent] = useState(null)
  const [error, setError] = useState('')

  const handleJoin = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(api(`/api/events/by-code/${code}`))
      if (!res.ok) throw new Error('Event not found')
      const ev = await res.json()
      setEvent(ev)
      // For demo we use a random user id
      const user_id = localStorage.getItem('su_user') || `guest-${Math.random().toString(36).slice(2,8)}`
      localStorage.setItem('su_user', user_id)
      await fetch(api(`/api/events/${ev.id}/join`), {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id })
      })
      onJoined && onJoined(ev)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-5 border border-gray-200">
      <div className="flex items-center gap-3">
        <QrCode className="text-purple-500" />
        <h3 className="text-lg font-semibold">Join an event</h3>
      </div>
      <p className="text-gray-600 text-sm mt-1">Scan or enter a code to jump into the shared album.</p>

      <div className="mt-4 flex gap-2">
        <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Enter code" className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300" />
        <button onClick={handleJoin} disabled={loading || !code} className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#A66CFF] to-[#E0AAFF] text-white disabled:opacity-50">{loading? 'Joining...' : 'Join'}</button>
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      {event && (
        <div className="mt-4 p-3 rounded-lg bg-gray-50 border text-sm">
          <div className="font-medium">{event.title}</div>
          <div className="text-gray-600">Participants: {event.participants?.length || 0}</div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="p-3 rounded-xl border flex items-center gap-2"><Camera size={18} className="text-purple-500"/> Add Media</div>
        <div className="p-3 rounded-xl border flex items-center gap-2"><Users size={18} className="text-purple-500"/> View Album</div>
        <div className="p-3 rounded-xl border flex items-center gap-2"><Share2 size={18} className="text-purple-500"/> Share Link</div>
        <div className="p-3 rounded-xl border flex items-center gap-2">Challenges</div>
      </div>
    </div>
  )
}
