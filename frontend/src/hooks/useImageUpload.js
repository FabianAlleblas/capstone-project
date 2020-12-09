import { useState } from 'react'

export default function useImage() {
  const [imageBase64, setImageBase64] = useState()
  const [picture, setPicture] = useState()

  return {
    picture,
    imageBase64,
    onChangePicture,
    deleteImg,
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
  }
}
