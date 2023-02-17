// File: /src/config/user.jsx

import { doc, onSnapshot, collection } from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from './firebaseconfig'
import { createAvabls } from './utils.js'

// Context allows child components to access info from the parent component
// Might be useful for making the navbar or when a user accesses a certain page...
export const UserContext = createContext({ user: null })

export function useUser () {
  return useContext(UserContext)
}

export function UserProvider ({ children }) {
  const [user, setUser] = useCachedState('user', auth.currentUser)
  const [state, setState] = useCachedState('state', { user: null })
  const [groupMembs, setGroupMembs] = useState([]);
  const [team, setTeam] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => { setUser(user) })
    return () => { unsubscribe() }
  })

  useEffect(() => {
    if(groupMembs.length!==0 && team==="") {
      let lookhere=" ";
      groupMembs.map((groupMemb) => {
        onSnapshot(doc(db, 'users', groupMemb), doc => {
          // display for /profile
          lookhere=lookhere+" "+doc.data().name + " | " + String(doc.data().squidNum);
          setTeam(lookhere);
        })
      });
    }
  })

  useEffect(() => {
    if (user != null && Object.keys(state).length <= 2) {
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), doc => {
        setState({
          user: doc.data()
        })
        // console.log(state.user.groupName);
      })
      // get the list of members from collection groups
      if(state.user !== undefined && state.user !== null && groupMembs.length===0 && state.user.hasOwnProperty('groupName')) {
        onSnapshot(doc(db, 'groups', state.user.groupName), doc => {
          setGroupMembs(doc.data().members);
        })
      }

      return () => { unsubscribe() }
      } else {
        setState({ user: null })
      }
    }, [user])
    return <UserContext.Provider value={[state, team, groupMembs]}>{children}</UserContext.Provider>
  } // <--- UserProvider() function ends here

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