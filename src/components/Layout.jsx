import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Home, Image as ImageIcon, Compass, User } from 'lucide-react'

export default function Layout({ children }) {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F6F3FF] to-white">
      <div className="flex-1">{children}</div>
      <nav className="sticky bottom-0 bg-white/80 backdrop-blur border-t border-purple-100">
        <div className="max-w-xl mx-auto grid grid-cols-4">
          <Tab to="/" icon={<Home size={22} />} label="Home" />
          <Tab to="/album" icon={<ImageIcon size={22} />} label="Album" />
          <Tab to="/explore" icon={<Compass size={22} />} label="Explore" />
          <Tab to="/profile" icon={<User size={22} />} label="Profile" />
        </div>
      </nav>
    </div>
  )
}

function Tab({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center justify-center gap-1 py-3 text-sm ${
          isActive ? 'text-purple-600' : 'text-gray-500'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}
