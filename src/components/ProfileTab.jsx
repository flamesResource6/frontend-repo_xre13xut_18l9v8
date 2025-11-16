import { useEffect, useState } from 'react'

export default function ProfileTab() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [userId] = useState('user-' + Math.random().toString(36).slice(2, 8))
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchProfile() {
    const res = await fetch(`${baseUrl}/api/user/${userId}`)
    const data = await res.json()
    setProfile(data)
  }

  if (!profile) return null

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-2xl shadow-sm p-4 border border-purple-100 flex items-center gap-3">
        <img src={profile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.username||'Guest'}`} alt="avatar" className="w-12 h-12 rounded-full" />
        <div>
          <p className="font-semibold">{profile.username || 'Guest'}</p>
          <p className="text-sm text-gray-500">{profile.uploads_count || 0} uploads</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 border border-purple-100">
        <p className="font-semibold mb-2">Joined Events</p>
        <div className="space-y-2">
          {(profile.joined_events || []).map(e => (
            <a key={e._id} href={`/album?event=${e._id}`} className="block border rounded-xl p-3 hover:bg-purple-50">
              <p className="font-medium">{e.title}</p>
              <p className="text-sm text-gray-500">{e.location || '—'}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 border border-purple-100">
        <p className="font-semibold mb-2">Quick Challenges</p>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>Take a group selfie with at least 5 people</li>
          <li>Capture the funniest moment</li>
          <li>Find someone wearing the same color and take a pic together</li>
        </ul>
      </div>
    </div>
  )
}
