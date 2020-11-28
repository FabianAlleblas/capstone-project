import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from '../../Components/Header/Header'
import PlantDetailCard from '../../Components/Plantdetailcard/PlantDetailCard'

export default function DetailPage({ plantList }) {
  const history = useHistory()
  const query = useQuery()
  const plantId = parseInt(query.get('id'))
  const plant = plantList.find((plant) => plant.id === plantId)

  return (
    <>
      <FixedHeader hasArrow onClick={openPlantList}>
        {plant?.name}
      </FixedHeader>
      <CardContainer>
        <PlantDetailCard species={plant?.species} info={plant?.info} />
      </CardContainer>
    </>
  )

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

  function openPlantList() {
    history.push('/')
  }
}

const FixedHeader = styled(Header)`
  left: 0;
  position: fixed;
  top: 0;
`

const CardContainer = styled.main`
  padding: 100px 20px 0;
`
