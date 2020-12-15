import { useEffect, useState } from 'react'
import { loadFromLocal, saveToLocal } from '../lib/localStorage'
import { loginUser, signUpUser } from '../services/handleApiUserAccess'

export default function useUser() {
  const [userData, setUserData] = useState()
  const notAuthorized = { authorized: false }
  const authorized = { authorized: true }

  useEffect(() => {
    setUserData(loadFromLocal('userData') ?? notAuthorized)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    saveToLocal('userData', userData)
  }, [userData])

  return { userData, setUserData, userLogin, userRegistration, userLogout }

  function userLogin(formData) {
    loginUser(formData).then((responseData) =>
      responseData.error
        ? setUserData({ error: responseData.error })
        : setUserData({ ...authorized, ...responseData })
    )
  }

  function userRegistration(formData) {
    signUpUser(formData).then((responseData) =>
      responseData.error ? alert(responseData.error) : setUserData(responseData)
    )
  }

  function userLogout() {
    setUserData(notAuthorized)
  }
}
