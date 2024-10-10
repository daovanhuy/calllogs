import React from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Search from './components/Search'
import CacheManagement from './components/CacheManagement'
import Import from './components/Import'
import RunningTask from './components/RunningTask'
import Management from './components/Management'
import UserManagement from './components/UserManagement'
import LanguageSwitch from './components/LanguageSwitch'
import Login from './components/Login'

const AppContent: React.FC = () => {
  const [activeComponent, setActiveComponent] = React.useState('dashboard')
  const { user, loading } = useAuth()

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
      case 'userManagement':
        return user?.role === 'admin' ? <UserManagement /> : <div>Access Denied</div>
      default:
        return <Dashboard />
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="text-2xl font-semibold">Loading...</div>
    </div>
  }

  if (!user) {
    return <Login />
  }

  return (
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
  )
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App