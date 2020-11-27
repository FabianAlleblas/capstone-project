import { useEffect, useState } from 'react'
import getData from '../services/getData'
import postData from '../services/postData'

export default function usePlantList() {
  const [plantList, setPlantList] = useState([])

  useEffect(() => {
    getData().then((data) =>
      data.error ? alert(data.error) : setPlantList(data)
    )
  }, [])

  return { plantList, savePlantData }

  function savePlantData(formData) {
    postData(formData).then((responseData) =>
      responseData.error
        ? alert(responseData.error)
        : setPlantList([...plantList, responseData])
    )
  }
}
