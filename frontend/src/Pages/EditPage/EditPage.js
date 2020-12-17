import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import EditPlantForm from '../../Components/Forms/EditPlantForm'
import Header from '../../Components/Header/Header'
import ErrorModal from '../../Components/Modals/ErrorModal'

EditPage.propTypes = {
  updatePlantData: PropTypes.func.isRequired,
  plantList: PropTypes.array.isRequired,
  deletePlantData: PropTypes.func.isRequired,
}

export default function EditPage({
  updatePlantData,
  plantList,
  deletePlantData,
}) {
  const history = useHistory()
  const query = useQuery()
  const plant = plantById(useQuery)

  if (!plant) {
    return (
      <ErrorModalFixed closeErrorModal={() => history.push('/')}>
        Plant not found!
      </ErrorModalFixed>
    )
  }

  return (
    <>
      <FixedHeader showDeleteButton secondaryStyle onClickDelete={handleDelete}>
        Edit Your Plant
      </FixedHeader>
      <FormContainer>
        <EditPlantForm
          updatePlantData={updatePlantData}
          deletePlantData={deletePlantData}
          plant={plant}
        />
      </FormContainer>
    </>
  )

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

  function plantById() {
    const plantId = parseInt(query.get('id'))
    const plant = plantList.find((plant) => plant.id === plantId)

    return plant
  }

  function handleDelete() {
    deletePlantData(plant.id)
    history.push('/')
  }
}

const FixedHeader = styled(Header)`
  left: 0;
  position: fixed;
  top: 0;
`

const FormContainer = styled.main`
  align-items: center;
  background-color: var(--primary-dark);
  display: flex;
  height: 100vh;
  padding: 40px 40px 0;
  place-content: center;
`

const ErrorModalFixed = styled(ErrorModal)`
  height: 100vh;
  left: 0;
  position: absolute;
  top: 0;
`
