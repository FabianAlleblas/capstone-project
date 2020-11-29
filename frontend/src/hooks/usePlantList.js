import { useEffect, useState } from 'react'
import getData from '../services/getData'
import postData from '../services/postData'
import updateData from '../services/updateData'

export default function usePlantList() {
  const [plantList, setPlantList] = useState(false)

  useEffect(() => {
    getData().then((data) =>
      data.error ? alert(data.error) : setPlantList(data)
    )
  }, [])

  return { plantList, savePlantData, updatePlantData }

  function savePlantData(formData) {
    postData(formData).then((responseData) =>
      responseData.error
        ? alert(responseData.error)
        : setPlantList([...plantList, responseData])
    )
  }

  function updatePlantData(formData, plantId) {
    const index = plantList.findIndex((plant) => plant.id === plantId)
    updateData(formData, plantId).then((responseData) =>
      responseData.error
        ? alert(responseData.error)
        : setPlantList([
            ...plantList.slice(0, index),
            responseData,
            ...plantList.slice(index + 1),
          ])
    )
  }
}
