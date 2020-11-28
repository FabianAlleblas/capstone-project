import styled from 'styled-components/macro'
import EditPlantForm from '../../Components/Forms/EditPlantForm'
import Header from '../../Components/Header/Header'

export default function EditPage({ savePlantData, plantList }) {
  return (
    <>
      <FixedHeader secondaryStyle>Edit Your Plant</FixedHeader>
      <FormContainer>
        <EditPlantForm savePlantData={savePlantData} plantList={plantList} />
      </FormContainer>
    </>
  )
}

const FixedHeader = styled(Header)`
  left: 0;
  position: fixed;
  top: 0;
`

const FormContainer = styled.main`
  background-color: var(--primary-dark);
  display: flex;
  height: 100vh;
  place-content: center;
  align-items: center;
`
