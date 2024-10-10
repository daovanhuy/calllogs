import React, { useState } from 'react'
import { Home, Search, Database, Upload, Play, Settings, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'

interface SidebarProps {
  setActiveComponent: (component: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveComponent }) => {
  const { language } = useLanguage()
  const { user } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { icon: Home, label: language === 'en' ? 'Dashboard' : 'Bảng điều khiển', component: 'dashboard' },
    { icon: Search, label: language === 'en' ? 'Search' : 'Tìm kiếm', component: 'search' },
    { icon: Database, label: language === 'en' ? 'Cache Management' : 'Quản lý bộ nhớ đệm', component: 'cacheManagement' },
    { icon: Upload, label: language === 'en' ? 'Import' : 'Nhập', component: 'import' },
    { icon: Play, label: language === 'en' ? 'Running Task' : 'Tác vụ đang chạy', component: 'runningTask' },
    { icon: Settings, label: language === 'en' ? 'Management' : 'Quản lý', component: 'management' },
  ]

  if (user?.role === 'admin') {
    menuItems.push({ icon: Users, label: language === 'en' ? 'User Management' : 'Quản lý người dùng', component: 'userManagement' })
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={`bg-gray-800 text-white h-screen ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out relative`}>
      <nav className="py-4">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isCollapsed ? 'text-center' : ''}`}
            onClick={() => setActiveComponent(item.component)}
          >
            <item.icon className={`inline-block ${isCollapsed ? 'mr-0' : 'mr-2'}`} size={20} />
            {!isCollapsed && <span>{item.label}</span>}
          </a>
        ))}
      </nav>
      <button
        className="absolute top-1/2 -right-3 bg-gray-800 text-white p-1 rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  )
}

export default Sidebar