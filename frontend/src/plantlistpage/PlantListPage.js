import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import PlusButton from '../components/buttons/PlusButton'
import Header from '../components/header/Header'
import PlantCard from '../components/plantcard/PlantCard'

export default function PlantListPage({ plantList }) {
  const history = useHistory()

  return (
    <>
      <FixedHeader />
      <ItemContainer>
        {plantList.map(({ id, name, species }) => (
          <PlantCard key={id} name={name} species={species} />
        ))}
      </ItemContainer>
      <FixedPlusButton onClick={handleClick} />
    </>
  )

  function handleClick() {
    history.push('/form')
  }
}

const FixedHeader = styled(Header)`
  left: 0;
  position: fixed;
  top: 0;
`

const ItemContainer = styled.section`
  display: grid;
  gap: 40px 20px;
  grid-template-columns: 1fr 1fr;
  padding: 100px 20px 20px;
`
const FixedPlusButton = styled(PlusButton)`
  bottom: 20px;
  position: fixed;
  right: 20px;
`
