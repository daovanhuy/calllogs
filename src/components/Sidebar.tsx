import React from 'react'
import { Home, Search, Database, Upload, Play, Settings } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

interface SidebarProps {
  setActiveComponent: (component: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveComponent }) => {
  const { language } = useLanguage()

  const menuItems = [
    { icon: Home, label: language === 'en' ? 'Dashboard' : 'Bảng điều khiển', component: 'dashboard' },
    { icon: Search, label: language === 'en' ? 'Search' : 'Tìm kiếm', component: 'search' },
    { icon: Database, label: language === 'en' ? 'Cache Management' : 'Quản lý bộ nhớ đệm', component: 'cacheManagement' },
    { icon: Upload, label: language === 'en' ? 'Import' : 'Nhập', component: 'import' },
    { icon: Play, label: language === 'en' ? 'Running Task' : 'Tác vụ đang chạy', component: 'runningTask' },
    { icon: Settings, label: language === 'en' ? 'Management' : 'Quản lý', component: 'management' },
  ]

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
      <nav>
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
            onClick={() => setActiveComponent(item.component)}
          >
            <item.icon className="inline-block mr-2" size={20} />
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar