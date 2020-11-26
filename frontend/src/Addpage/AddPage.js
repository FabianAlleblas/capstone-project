import styled from 'styled-components/macro'
import AddPlantForm from '../Components/Forms/AddPlantForm'
import Header from '../Components/Header/Header'

export default function AddPage({ savePlantData }) {
  return (
    <PageWrapper>
      <FixedHeader secondaryStyle>Add Plant</FixedHeader>
      <AddPlantForm savePlantData={savePlantData} />
    </PageWrapper>
  )
}

const FixedHeader = styled(Header)`
  left: 0;
  position: fixed;
  top: 0;
`

const PageWrapper = styled.div`
  background-color: var(--primary-dark);
  display: flex;
  height: 100vh;
  place-content: center;
  align-items: center;
`
