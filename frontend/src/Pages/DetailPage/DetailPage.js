import { useLocation } from 'react-router-dom'
import Header from '../../Components/Header/Header'
import { useHistory } from 'react-router-dom'

export default function DetailPage({ plantList }) {
  const history = useHistory()
  const query = useQuery()
  const plantId = parseInt(query.get('id'))
  const plant = plantList.find((plant) => plant.id === plantId)
  console.log(plantId)
  return (
    <>
      <Header hasArrow onClick={() => history.push('/')}>
        {plant?.plantname}
      </Header>
      <p>{plant?.plantspecies}</p>
    </>
  )

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }
}
