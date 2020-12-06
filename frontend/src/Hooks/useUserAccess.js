import { useEffect, useState } from 'react'
import { loadFromLocal, saveToLocal } from '../Lib/localStorage'
import { loginUser, signUpUser } from '../Services/handleApiUserAccess'

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

  return { userData, userLogin, userRegistration, userLogout }

  function userLogin(formData) {
    loginUser(formData).then((responseData) =>
      responseData.error
        ? alert(responseData.error)
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
