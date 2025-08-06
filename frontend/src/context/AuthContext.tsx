// 'use client'

// import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

// interface User {
//   id: string
//   email: string
//   name: string
//   isPro?: boolean
// }

// interface AuthContextType {
//   user: User | null
//   login: (email: string, password: string) => Promise<void>
//   logout: () => void
//   register: (email: string, password: string, name: string) => Promise<void>
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [isInitialized, setIsInitialized] = useState(false)

//   // Initialize user state from localStorage after mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem('user')
//     if (savedUser) {
//       setUser(JSON.parse(savedUser))
//     }
//     setIsInitialized(true)
//   }, [])

//   const login = async (email: string, password: string) => {
//     try {
//       // TODO: Implement actual login logic with your backend
//       const userData = {
//         id: '1',
//         email,
//         name: 'Test User',
//         isPro: false
//       }
//       setUser(userData)
//       localStorage.setItem('user', JSON.stringify(userData))
//     } catch (error) {
//       console.error('Login failed:', error)
//       throw error
//     }
//   }

//   const logout = () => {
//     setUser(null)
//     localStorage.removeItem('user')
//   }

//   const register = async (email: string, password: string, name: string) => {
//     try {
//       // TODO: Implement actual registration logic with your backend
//       const userData = {
//         id: '1',
//         email,
//         name,
//         isPro: false
//       }
//       setUser(userData)
//       localStorage.setItem('user', JSON.stringify(userData))
//     } catch (error) {
//       console.error('Registration failed:', error)
//       throw error
//     }
//   }

//   // Don't render children until we've checked localStorage
//   if (!isInitialized) {
//     return null
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout, register }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// } 

'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  // Add other user fields as needed
}

interface AuthContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  isInitialized: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user')
      if (savedUser && savedUser !== 'undefined') {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error)
      setUser(null)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, isInitialized }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
