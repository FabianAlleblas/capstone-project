import { useState, useEffect } from 'react'

export default function useImage() {
  const [imageBase64, setImageBase64] = useState()
  const [picture, setPicture] = useState()
  const [isImageValid, setIsImageValid] = useState(true)

  useEffect(() => {
    if (picture) {
      imageValidation() ? setIsImageValid(true) : setIsImageValid(false)
    }
    // eslint-disable-next-line
  }, [picture])

  return {
    picture,
    imageBase64,
    onChangePicture,
    deleteImg,
    isImageValid,
  }

  function onChangePicture(event) {
    if (event.target.files[0]) {
      const reader = new FileReader()
      setPicture(event.target.files[0])
      reader.addEventListener('load', () => {
        setImageBase64(reader.result)
      })
      reader.readAsDataURL(event.target.files[0])
    }
  }

  function deleteImg(event) {
    event.preventDefault()
    setImageBase64()
    setPicture()
    setIsImageValid(true)
  }

  function imageValidation() {
    if (!picture.name.match(/\.(jpg|jpeg|png)$/)) {
      return false
    }
    if (picture.size > 1500000) {
      return false
    }
    return true
  }
}
