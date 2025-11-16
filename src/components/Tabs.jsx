import { useState } from 'react'
import { Home, Image as ImageIcon, Compass, User, QrCode, Camera, Heart, MessageSquare } from 'lucide-react'

export default function Tabs({ active, onChange }) {
  const tabs = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'album', label: 'Album', icon: ImageIcon },
    { key: 'explore', label: 'Explore', icon: Compass },
    { key: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center">
      <div className="bg-white/90 backdrop-blur border border-gray-200 shadow-lg rounded-full px-4 py-2 flex gap-2">
        {tabs.map(t => {
          const Icon = t.icon
          const isActive = active === t.key
          return (
            <button key={t.key} onClick={() => onChange(t.key)} className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${isActive ? 'bg-gradient-to-r from-[#A66CFF] to-[#E0AAFF] text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
              <Icon size={18} />
              <span className="hidden sm:block text-sm">{t.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
