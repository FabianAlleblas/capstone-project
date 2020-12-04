import { useEffect, useState } from 'react'
import { loadFromLocal, saveToLocal } from '../lib/localStorage'
import { signUpUser, loginUser } from '../services/handleApiUser'

export default function useUser() {
  const [userData, setUserData] = useState()

  useEffect(() => {
    setUserData(loadFromLocal('userData'))
  }, [])

  useEffect(() => {
    saveToLocal('userData', userData)
  }, [userData])

  return { userData, setUserData, userLogin, userRegistration, userLogout }

  function userLogin(formData) {
    loginUser(formData).then((responseData) =>
      responseData.error ? alert(responseData.error) : setUserData(responseData)
    )
  }

  function userRegistration(formData) {
    signUpUser(formData).then((responseData) =>
      responseData.error ? alert(responseData.error) : setUserData(responseData)
    )
  }

  function userLogout() {
    localStorage.removeItem('userData')
    setUserData()
  }
}
