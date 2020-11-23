import styled from 'styled-components/macro'
import PlantCard from '../components/plantcard/PlantCard'
import plants from '../data/plants.json'

export default function PlantListPage() {
  return (
    <ItemContainer>
      {plants.map(({ id, name, species }) => (
        <PlantCard key={id} plantname={name} plantspecies={species} />
      ))}
    </ItemContainer>
  )
}

const ItemContainer = styled.section`
  display: grid;
  gap: 40px 20px;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
`
