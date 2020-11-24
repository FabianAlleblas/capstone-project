import styled from 'styled-components/macro'
import PlusButton from '../components/buttons/PlusButton'
import Header from '../components/header/Header'
import PlantCard from '../components/plantcard/PlantCard'
import plants from '../data/plants.json'
import { useHistory } from 'react-router-dom'

export default function PlantListPage() {
  const history = useHistory()

  return (
    <>
      <PositionHeader>
        <Header />
      </PositionHeader>
      <ItemContainer>
        {plants.map(({ id, name, species }) => (
          <PlantCard key={id} name={name} species={species} />
        ))}
      </ItemContainer>
      <PositionButton>
        <PlusButton onClick={handleClick} />
      </PositionButton>
    </>
  )

  function handleClick() {
    history.push('/form')
  }
}

const PositionHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
`

const ItemContainer = styled.section`
  display: grid;
  gap: 40px 20px;
  grid-template-columns: 1fr 1fr;
  padding: 100px 20px 20px;
`
const PositionButton = styled.div`
  bottom: 20px;
  position: fixed;
  right: 20px;
`
