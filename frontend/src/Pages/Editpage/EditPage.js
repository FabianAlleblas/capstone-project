import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import EditPlantForm from '../../Components/Forms/EditPlantForm'
import Header from '../../Components/Header/Header'

export default function EditPage({ updatePlantData, plantList }) {
  const query = useQuery()
  const plantId = parseInt(query.get('id'))
  const plant = plantList.find((plant) => plant.id === plantId ?? false)

  if (!plant) {
    return <div>Plant not found!</div>
  }

  return (
    <>
      <FixedHeader secondaryStyle>Edit Your Plant</FixedHeader>
      <FormContainer>
        <EditPlantForm updatePlantData={updatePlantData} plant={plant} />
      </FormContainer>
    </>
  )

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }
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
