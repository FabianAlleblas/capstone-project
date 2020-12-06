import { useEffect, useState } from 'react'
import {
  deletePlant,
  getPlants,
  postPlant,
  updatePlant,
  resetTimer,
} from '../Services/handleApiPlants'

export default function usePlantList(userData) {
  const [plantList, setPlantList] = useState()

  useEffect(() => {
    getPlants(userData).then((data) =>
      data?.error ? alert(data?.error) : setPlantList(data)
    )
  }, [userData])

  return {
    plantList,
    savePlantData,
    updatePlantData,
    deletePlantData,
    resetCareTimer,
  }

  function savePlantData(formData) {
    postPlant(formData, userData).then((responseData) =>
      responseData.error
        ? alert(responseData.error)
        : setPlantList([...plantList, responseData])
    )
  }

  function updatePlantData(formData, plantId) {
    const index = plantList.findIndex((plant) => plant.id === plantId)
    updatePlant(formData, plantId, userData).then((responseData) =>
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
    deletePlant(plantId, userData).then((responseData) =>
      responseData.error
        ? alert(responseData.error)
        : setPlantList([...plantList.filter((plant) => plant.id !== plantId)])
    )
  }

  function resetCareTimer(plantId, type) {
    const index = plantList.findIndex((plant) => plant.id === plantId)
    resetTimer(plantId, type, userData).then((responseData) =>
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
