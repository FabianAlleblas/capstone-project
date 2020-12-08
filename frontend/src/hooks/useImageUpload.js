const { useState } = require('react')

export default function useImage() {
  const [imageBase64, setImageBase64] = useState(null)
  const [picture, setPicture] = useState(null)

  return {
    imageBase64,
    onChangePicture,
    deleteImg,
  }

  function onChangePicture(event) {
    if (event.target.files[0]) {
      setPicture(event.target.files[0])
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImageBase64(reader.result)
      })
      reader.readAsDataURL(event.target.files[0])
    }
  }

  function deleteImg(event) {
    event.preventDefault()
    setImageBase64(null)
    setPicture(null)
  }
}
