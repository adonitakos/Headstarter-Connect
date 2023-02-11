import { doc, onSnapshot } from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from './firebase'

// Set unique types
const User = {
    id: "",
    email: ""
}
const UserState = {
    user: User | null
}
// Context allows child components to access info from the parent component
// Might be useful for making the navbar or when a user accesses a certain page...
const UserContext = createContext(UserState({ user: null }))


export function useUser () {
  return useContext(UserContext)
}

export function UserProvider ({ children }) {
  const [user, setUser] = useCachedState('user', auth.currentUser)
  const [state, setState] = useCachedState(UserState('state', { user: null }))

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => { setUser(user) })
    return () => { unsubscribe() }
  })

  useEffect(() => {
    if (user != null) {
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), doc => {
        setState({
          user: doc.data()
        })
      })
      return () => { unsubscribe() }
    } else {
      setState({ user: null })
    }
  }, [user])

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>
}

function useCachedState (key, defaultValue) {
  const initialValue = (() => {
    const data = localStorage.getItem(key)
    if (data != null) return JSON.parse(data)
    else return defaultValue
  })()
  const [state, setState] = useState(initialValue)
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state])
  return [state, setState]
}