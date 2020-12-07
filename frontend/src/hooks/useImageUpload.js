const { useState } = require('react')

export default function useImage() {
  const [picture, setPicture] = useState(null)
  const [imgData, setImgData] = useState(null)

  return {
    picture,
    imgData,
    onChangePicture,
    deleteImg,
  }

  function onChangePicture(event) {
    if (event.target.files[0]) {
      setPicture(event.target.files[0])
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImgData(reader.result)
      })
      reader.readAsDataURL(event.target.files[0])
    }
  }

  function deleteImg(event) {
    event.preventDefault()
    setPicture(null)
    setImgData(null)
  }
}
