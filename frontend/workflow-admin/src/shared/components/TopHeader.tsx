import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { logout } from '../../app/store/authSlice'
import { Card } from './Card'
import { useTheme } from '../theme/useTheme'

export function TopHeader() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search or press ⌘K..."
            className="w-full max-w-sm rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-4 ml-8">
          <button
            type="button"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              🔔
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
            </button>

            {showNotifications && (
              <Card className="absolute right-0 mt-2 w-80 p-0 shadow-xl z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {[
                    { icon: '📝', title: 'New task assigned', time: '2 min ago' },
                    { icon: '✅', title: 'Task completed', time: '1 hour ago' },
                    { icon: '💬', title: 'New message', time: '3 hours ago' },
                  ].map((notif, idx) => (
                    <div key={idx} className="p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex gap-3">
                        <span className="text-lg">{notif.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                          <p className="text-xs text-gray-600">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center text-sm font-bold">
                {user?.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
              </div>
              <span className="text-gray-600">▼</span>
            </button>

            {showDropdown && (
              <Card className="absolute right-0 mt-2 w-48 p-0 shadow-xl z-50">
                <div className="p-4 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition">
                    👤 Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition">
                    ⚙️ Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition">
                    ❓ Help
                  </button>
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
