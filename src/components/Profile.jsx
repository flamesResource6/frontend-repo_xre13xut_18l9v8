import { useEffect, useState } from 'react'

const api = (path) => `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}${path}`

export default function Profile() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const user_id = localStorage.getItem('su_user') || 'guest-profile'
    localStorage.setItem('su_user', user_id)
    fetchProfile(user_id)
  }, [])

  const fetchProfile = async (user_id) => {
    const res = await fetch(api(`/api/users/${user_id}/profile`))
    if (res.ok) setData(await res.json())
  }

  if (!data) return <div className="text-gray-600">Loading profile...</div>

  return (
    <div>
      <div className="flex items-center gap-3">
        <img src={data.user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${data.user.username || data.user.user_id}`} alt="avatar" className="w-12 h-12 rounded-full" />
        <div>
          <div className="font-semibold">{data.user.username || data.user.user_id}</div>
          <div className="text-sm text-gray-600">Events joined: {data.events.length}</div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Your contributions</h4>
        <div className="grid grid-cols-3 gap-2">
          {data.contributions.map(m => (
            <img key={m.id} src={m.url} className="w-full h-24 object-cover rounded" />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Challenges</h4>
        <ul className="text-sm text-gray-700 list-disc ml-5">
          <li>Take a group selfie with at least 5 people</li>
          <li>Capture the funniest moment</li>
          <li>Find someone wearing the same color and take a pic together</li>
        </ul>
      </div>
    </div>
  )
}
