import React, { useState } from 'react'
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
import { User, LogOut } from 'lucide-react'

const AppContent: React.FC = () => {
  const [activeComponent, setActiveComponent] = React.useState('dashboard')
  const { user, loading, signOut } = useAuth()
  const [showAccountMenu, setShowAccountMenu] = useState(false)

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

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
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
            <div className="flex items-center space-x-4">
              <LanguageSwitch />
              <div className="relative">
                <button
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 font-medium py-2 px-4 rounded"
                >
                  <User size={20} />
                  <span>{user.email}</span>
                </button>
                {showAccountMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      <div>Email: {user.email}</div>
                      <div>Role: {user.role}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
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