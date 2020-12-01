import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import PlusButton from '../../Components/Buttons/PlusButton'
import Header from '../../Components/Header/Header'
import PlantListCard from '../../Components/Plantlistcard/PlantListCard'

export default function PlantListPage({ plantList }) {
  const history = useHistory()

  return (
    <>
      <FixedHeader>My Plants</FixedHeader>
      <ListContainer>
        {plantList.map((plant) => (
          <PlantListCard
            key={plant.id}
            plant={plant}
            onClick={() => openDetailPage(plant.id)}
          />
        ))}
      </ListContainer>
      <FixedPlusButton onClick={openAddForm} />
    </>
  )

  function openAddForm() {
    history.push('/addplant')
  }
  function openDetailPage(id) {
    history.push(`/plant?id=${id}`)
  }
}

const FixedHeader = styled(Header)`
  left: 0;
  position: fixed;
  top: 0;
`

const ListContainer = styled.main`
  display: grid;
  gap: 40px 30px;
  grid-template-columns: 1fr 1fr;
  padding: 100px 30px 90px;
`
const FixedPlusButton = styled(PlusButton)`
  bottom: 20px;
  position: fixed;
  right: 20px;
`
