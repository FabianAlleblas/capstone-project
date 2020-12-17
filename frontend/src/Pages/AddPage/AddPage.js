import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import AddPlantForm from '../../Components/Forms/AddPlantForm'
import Header from '../../Components/Header/Header'

AddPage.propTypes = {
  savePlantData: PropTypes.func.isRequired,
}

export default function AddPage({ savePlantData }) {
  return (
    <>
      <FixedHeader secondaryStyle>Add Plant</FixedHeader>
      <FormContainer>
        <AddPlantForm savePlantData={savePlantData} />
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
  align-items: center;
  background-color: var(--primary-dark);
  display: flex;
  height: 100vh;
  padding: 40px 40px 0;
  place-content: center;
`
