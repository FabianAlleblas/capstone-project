import { useEffect, useState } from 'react'
import { loadFromLocal, saveToLocal } from '../lib/localStorage'

export default function useUser() {
  const [userData, setUserData] = useState()

  useEffect(() => {
    setUserData(loadFromLocal('userData') ?? { key: false })
  }, [])

  return { userData, userLogin, userRegistration, userLogout }

  function userLogin(data) {
    const authData = { key: true, email: data.email, password: data.password }
    saveToLocal('userData', authData)
    setUserData(authData)
  }

  function userRegistration(data) {
    const authData = { key: true, email: data.email, password: data.password }
    saveToLocal('userData', authData)
    setUserData(authData)
  }

  function userLogout(userData) {
    const authData = {
      key: false,
      email: userData.email,
      password: userData.password,
    }
    saveToLocal('userData', authData)
    setUserData(authData)
  }
}
