import { useEffect, useState } from 'react'
import {
  deletePlant,
  getPlants,
  postPlant,
  updatePlant,
  resetTimer,
} from '../services/handleApiPlants'

export default function usePlantList(userData, setUserData) {
  const [plantList, setPlantList] = useState()

  useEffect(() => {
    getPlants(userData).then((data) =>
      data?.error
        ? alert(data?.error)
        : !data
        ? setUserData()
        : setPlantList(data)
    )
  }, [userData])
  console.log(userData)
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
