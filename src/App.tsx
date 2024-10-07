import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Search from './components/Search'
import CacheManagement from './components/CacheManagement'
import Import from './components/Import'
import RunningTask from './components/RunningTask'
import Management from './components/Management'
import LanguageSwitch from './components/LanguageSwitch'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
  const [activeComponent, setActiveComponent] = useState('dashboard')

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />
      case 'search':
        return <Search />
      case 'cacheManagement':
        return <CacheManagement />
      case 'import':
        return <Import />
      case 'runningTask':
        return <RunningTask />
      case 'management':
        return <Management />
      default:
        return <Dashboard />
    }
  }

  return (
    <LanguageProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar setActiveComponent={setActiveComponent} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm z-10">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Callogs Management</h1>
              <LanguageSwitch />
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {renderComponent()}
            </div>
          </main>
        </div>
      </div>
    </LanguageProvider>
  )
}

export default App