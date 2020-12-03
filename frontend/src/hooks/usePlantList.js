import { useEffect, useState } from 'react'
import {
  deletePlant,
  getPlants,
  postPlant,
  updatePlant,
  resetTimer,
} from '../services/handlePlantApi'

export default function usePlantList(userData) {
  const [plantList, setPlantList] = useState(false)

  useEffect(() => {
    getPlants().then((data) =>
      data.error ? alert(data.error) : setPlantList(data)
    )
  }, [])

  return {
    plantList,
    savePlantData,
    updatePlantData,
    deletePlantData,
    resetCareTimer,
  }

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

  function deletePlantData(plantId) {
    deletePlant(plantId).then((responseData) =>
      responseData.error
        ? alert(responseData.error)
        : setPlantList([...plantList.filter((plant) => plant.id !== plantId)])
    )
  }

  function resetCareTimer(plantId, type) {
    const index = plantList.findIndex((plant) => plant.id === plantId)
    resetTimer(plantId, type).then((responseData) =>
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
