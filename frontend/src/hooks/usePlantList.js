import { useEffect, useState } from 'react'
import { loadFromLocal, saveToLocal } from '../lib/localStorage'

export default function usePlantList() {
  const [plantList, setPlantList] = useState(loadFromLocal('PlantList') ?? [])

  useEffect(() => {
    saveToLocal('PlantList', plantList)
  }, [plantList])

  return { plantList, saveEntry }

  function saveEntry(entry) {
    setPlantList([...plantList, entry])
  }
}
