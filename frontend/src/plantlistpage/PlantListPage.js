import styled from 'styled-components/macro'
import Header from '../components/header/Header'
import PlantCard from '../components/plantcard/PlantCard'
import plants from '../data/plants.json'

export default function PlantListPage() {
  return (
    <>
      <PositionWrapper>
        <Header />
      </PositionWrapper>
      <ItemContainer>
        {plants.map(({ id, name, species }) => (
          <PlantCard key={id} name={name} species={species} />
        ))}
      </ItemContainer>
    </>
  )
}

const PositionWrapper = styled.div`
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
