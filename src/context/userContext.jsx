import { createContext, useState, useContext } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, signOut } from 'firebase/auth'

const userContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setUser(auth)
    } catch (error) {
      console.error('Error signing in with email and password', error)
      throw error
    }
  }

  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      setUser(auth)
    } catch (error) {
      console.error('Error signing in with Google', error)
      throw error
    }
  }

  const signUpWithEmailAndPassword = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setUser(auth)
    } catch (error) {
      console.error('Error signing up with email and password', error)
      throw error
    }
  }

  const logout = () => {
    signOut(auth)
    setUser(null)
  }

  return (
    <userContext.Provider value={{ user, loginWithEmailAndPassword, signUpWithGoogle, signUpWithEmailAndPassword, logout }}>
      {children}
    </userContext.Provider>
  )
}

export const useUser = () => useContext(userContext)