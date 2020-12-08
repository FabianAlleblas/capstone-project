const { useState } = require('react')

export default function useImage() {
  const [imgData, setImgData] = useState(null)
  console.log(imgData)
  return {
    imgData,
    onChangePicture,
    deleteImg,
  }

  function onChangePicture(event) {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      setImgData(reader.result)
    })
    reader.readAsDataURL(event.target.files[0])
  }

  function deleteImg(event) {
    event.preventDefault()
    setImgData(null)
  }
}
