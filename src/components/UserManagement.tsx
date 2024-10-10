import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'

interface User {
  id: string
  email: string
  role: string
  is_active: boolean
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [newUserRole, setNewUserRole] = useState('user')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { language } = useLanguage()
  const { user: currentUser } = useAuth()

  const translations = {
    en: {
      title: 'User Management',
      email: 'Email',
      role: 'Role',
      status: 'Status',
      actions: 'Actions',
      addUser: 'Add User',
      password: 'Password',
      submit: 'Submit',
      active: 'Active',
      inactive: 'Inactive',
      enable: 'Enable',
      disable: 'Disable',
      remove: 'Remove',
      admin: 'Admin',
      user: 'User',
      errorFetchingUsers: 'Error fetching users',
      errorAddingUser: 'Error adding user',
      errorTogglingStatus: 'Error toggling user status',
      errorRemovingUser: 'Error removing user',
      userAdded: 'User added successfully',
      userStatusUpdated: 'User status updated successfully',
      userRemoved: 'User removed successfully',
    },
    vn: {
      title: 'Quản lý người dùng',
      email: 'Email',
      role: 'Vai trò',
      status: 'Trạng thái',
      actions: 'Hành động',
      addUser: 'Thêm người dùng',
      password: 'Mật khẩu',
      submit: 'Gửi',
      active: 'Hoạt động',
      inactive: 'Không hoạt động',
      enable: 'Kích hoạt',
      disable: 'Vô hiệu hóa',
      remove: 'Xóa',
      admin: 'Quản trị viên',
      user: 'Người dùng',
      errorFetchingUsers: 'Lỗi khi tải danh sách người dùng',
      errorAddingUser: 'Lỗi khi thêm người dùng',
      errorTogglingStatus: 'Lỗi khi thay đổi trạng thái người dùng',
      errorRemovingUser: 'Lỗi khi xóa người dùng',
      userAdded: 'Thêm người dùng thành công',
      userStatusUpdated: 'Cập nhật trạng thái người dùng thành công',
      userRemoved: 'Xóa người dùng thành công',
    },
  }

  const t = translations[language]

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('profiles').select('*')
    if (error) {
      console.error('Error fetching users:', error)
      setError(t.errorFetchingUsers)
    } else {
      setUsers(data)
    }
  }

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: newUserEmail,
        password: newUserPassword,
        email_confirm: true,
      })
      if (error) throw error

      await supabase.from('profiles').insert([
        { id: data.user.id, email: newUserEmail, role: newUserRole, is_active: true },
      ])

      setNewUserEmail('')
      setNewUserPassword('')
      setNewUserRole('user')
      setSuccess(t.userAdded)
      fetchUsers()
    } catch (error) {
      console.error('Error adding user:', error)
      setError(t.errorAddingUser)
    }
  }

  const toggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: !isActive })
        .eq('id', userId)
      if (error) throw error

      setSuccess(t.userStatusUpdated)
      fetchUsers()
    } catch (error) {
      console.error('Error toggling user status:', error)
      setError(t.errorTogglingStatus)
    }
  }

  const removeUser = async (userId: string) => {
    try {
      const { error: authError } = await supabase.auth.admin.deleteUser(userId)
      if (authError) throw authError

      const { error: dbError } = await supabase.from('profiles').delete().eq('id', userId)
      if (dbError) throw dbError

      setSuccess(t.userRemoved)
      fetchUsers()
    } catch (error) {
      console.error('Error removing user:', error)
      setError(t.errorRemovingUser)
    }
  }

  if (currentUser?.role !== 'admin') {
    return <div>You do not have permission to access this page.</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t.title}</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">{success}</div>}

      <form onSubmit={addUser} className="space-y-4">
        <input
          type="email"
          placeholder={t.email}
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <input
          type="password"
          placeholder={t.password}
          value={newUserPassword}
          onChange={(e) => setNewUserPassword(e.target.value)}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <select
          value={newUserRole}
          onChange={(e) => setNewUserRole(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="user">{t.user}</option>
          <option value="admin">{t.admin}</option>
        </select>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t.addUser}
        </button>
      </form>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.email}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.role}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.status}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.actions}</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.is_active ? t.active : t.inactive}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => toggleUserStatus(user.id, user.is_active)}
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  {user.is_active ? t.disable : t.enable}
                </button>
                <button
                  onClick={() => removeUser(user.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  {t.remove}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserManagement