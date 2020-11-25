import styled from 'styled-components/macro'
import AddPlantForm from '../Components/Forms/AddPlantForm'
import Header from '../Components/Header/Header'

export default function AddPage({ savePlantData }) {
  return (
    <PageWrapper>
      <FixedHeader text={'Add Plant'} isSecondary />
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
  align-items: center;
  background-color: var(--primary-dark);
  display: flex;
  height: 100vh;
`
