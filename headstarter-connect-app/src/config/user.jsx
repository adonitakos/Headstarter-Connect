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
  const [avails, setAvails] = useState([{}]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => { setUser(user) })
    return () => { unsubscribe() }
  })

  useEffect(() => {
    if(groupMembs.length!==0) {
      let lookhere=" ";
      groupMembs.map((groupMemb) => {
        onSnapshot(doc(db, 'users', groupMemb), doc => {
          lookhere=lookhere+" "+doc.data().name + " | " + String(doc.data().squidNum);
          setTeam(lookhere);
        })
      });
    }
  })

  useEffect(() => {
    if (user != null) {
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), doc => {
        setState({
          user: doc.data()
        })
        // console.log(state.user.groupName);
      })
      // get the list of members from collection groups
      if(state.user !== null) {
        onSnapshot(doc(db, 'groups', state.user.groupName), doc => {
          setGroupMembs(doc.data().members);
          // availabilities are randomly generated rn for testing purposes!
          setAvails(createAvabls((doc.data().members).length))
        })
      }

      return () => { unsubscribe() }
      } else {
        setState({ user: null })
      }
    }, [user])
    return <UserContext.Provider value={[state, team, avails]}>{children}</UserContext.Provider>
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