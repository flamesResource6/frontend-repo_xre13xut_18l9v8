import { useEffect, useState } from 'react'
import { QrCode, Users, PlusCircle, Share2, ListChecks, Image as ImageIcon } from 'lucide-react'

export default function HomeTab() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [joinCode, setJoinCode] = useState('')
  const [userId, setUserId] = useState('user-' + Math.random().toString(36).slice(2, 8))
  const [event, setEvent] = useState(null)
  const [status, setStatus] = useState('')

  const join = async () => {
    if (!joinCode) return
    setStatus('Joining...')
    try {
      const res = await fetch(`${baseUrl}/api/events/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: joinCode, user_id: userId, username: 'Guest' })
      })
      if (!res.ok) throw new Error('Invalid code')
      const data = await res.json()
      setEvent(data)
      setStatus('Joined!')
    } catch (e) {
      setStatus(e.message)
    }
  }

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-4 border border-purple-100">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#A66CFF]/10 to-[#E0AAFF]/10 text-purple-600">
            <QrCode />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Join an event</p>
            <p className="text-sm text-gray-500">Scan or enter a code</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <input
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            placeholder="Enter code (e.g. 4J7KQ2)"
            className="flex-1 border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button onClick={join} className="px-4 py-2 rounded-xl bg-purple-600 text-white">Join</button>
        </div>
        {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
      </div>

      {event && (
        <div className="bg-white rounded-2xl shadow-sm p-4 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.date_iso || 'Today'}</p>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Users size={18} />
              <span className="text-sm">{(event.participants || []).length}</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Action icon={<PlusCircle />} label="Add Photo/Video" onClick={() => alert('Use upload in Album tab')} />
            <Action icon={<ImageIcon />} label="View Album" onClick={() => window.location.href='/album?event='+event._id} />
            <Action icon={<ListChecks />} label="Challenges" onClick={() => alert('Open challenges')} />
            <Action icon={<Share2 />} label="Share Invite" onClick={() => navigator.share?.({ title: 'Join my event', text: 'Join on ShootUp', url: window.location.href })} />
          </div>
        </div>
      )}
    </div>
  )
}

function Action({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 border rounded-xl px-3 py-3 hover:bg-purple-50 transition">
      <div className="text-purple-600">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}
