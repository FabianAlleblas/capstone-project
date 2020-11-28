import { useLocation } from 'react-router-dom'
import Header from '../../Components/Header/Header'
import PlantCard from '../../Components/Plantcard/PlantCard'

export default function DetailPage({ plantList }) {
  const query = useQuery()
  const plantId = parseInt(query.get('id'))
  const plant = plantList.find((plant) => plant.id === plantId)
  console.log(plantId)
  return (
    <>
      <Header>{plant?.plantname}</Header>
      <p>{plant?.plantspecies}</p>
    </>
  )

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }
}
