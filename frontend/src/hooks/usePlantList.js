import { useEffect, useState } from 'react'
import getPlants from '../services/getPlants'
import postPlant from '../services/postPlant'
import updatePlant from '../services/updatePlant'

export default function usePlantList() {
  const [plantList, setPlantList] = useState(false)

  useEffect(() => {
    getPlants().then((data) =>
      data.error ? alert(data.error) : setPlantList(data)
    )
  }, [])

  return { plantList, savePlantData, updatePlantData }

  function savePlantData(formData) {
    postPlant(formData).then((responseData) =>
      responseData.error
        ? alert(responseData.error)
        : setPlantList([...plantList, responseData])
    )
  }

  function updatePlantData(formData, plantId) {
    const index = plantList.findIndex((plant) => plant.id === plantId)
    updatePlant(formData, plantId).then((responseData) =>
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
