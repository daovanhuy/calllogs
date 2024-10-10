import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { User } from '@supabase/supabase-js'

interface AuthUser extends User {
  role?: string
}

interface AuthContextType {
  user: AuthUser | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUserRole = async (userId: string) => {
    console.log('Fetching user role for userId:', userId)
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching user role:', error)
      return null
    }

    console.log('Fetched user role:', data?.role)
    return data?.role
  }

  useEffect(() => {
    const fetchSession = async () => {
      console.log('Fetching session...')
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error

        console.log('Session fetched:', session ? 'Session exists' : 'No session')
        if (session?.user) {
          const role = await fetchUserRole(session.user.id)
          setUser({ ...session.user, role })
          console.log('User set with role:', role)
        } else {
          setUser(null)
          console.log('No user session, user set to null')
        }
      } catch (error) {
        console.error('Error in fetchSession:', error)
        setUser(null)
      } finally {
        setLoading(false)
        console.log('Loading set to false')
      }
    }

    fetchSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event)
      if (session?.user) {
        const role = await fetchUserRole(session.user.id)
        setUser({ ...session.user, role })
        console.log('User updated on auth state change:', { ...session.user, role })
      } else {
        setUser(null)
        console.log('User set to null on auth state change')
      }
      setLoading(false)
    })

    return () => {
      console.log('Unsubscribing from auth listener')
      authListener.subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    console.log('Signing in...')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error('Sign in error:', error)
      throw error
    }
    console.log('Sign in successful')
  }

  const signOut = async () => {
    console.log('Signing out...')
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Sign out error:', error)
      throw error
    }
    console.log('Sign out successful')
  }

  const value = {
    user,
    signIn,
    signOut,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}