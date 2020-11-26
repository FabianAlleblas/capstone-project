import { useEffect, useState } from 'react'
import getData from '../services/getData'
import postData from '../services/postData'

export default function usePlantList() {
  const [plantList, setPlantList] = useState([])

  useEffect(() => {
    getData()
      .then((data) => setPlantList(data))
      .catch((error) => console.log(error))
  }, [])

  return { plantList, savePlantData }

  function savePlantData(formData) {
    postData(formData)
      .then((responseData) => setPlantList([...plantList, responseData]))
      .catch((error) => console.log(error))
  }
}
