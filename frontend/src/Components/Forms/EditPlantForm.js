import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import useForm from '../../hooks/useForm'
import FormButton from '../Buttons/FormButton'

export default function EditPlantForm({ updatePlantData, plant }) {
  EditPlantForm.propTypes = {
    updatePlantData: PropTypes.func.isRequired,
    plant: PropTypes.object.isRequired,
  }

  const history = useHistory()
  const { handleInputChange, formData } = useForm(plant)

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Your plants name*:
        <Input
          name="name"
          type="text"
          maxLength="28"
          onChange={handleInputChange}
          required
          value={formData?.name}
        />
      </Label>
      <Label>
        The species of your plant*:
        <Input
          name="species"
          type="text"
          maxLength="28"
          onChange={handleInputChange}
          required
          value={formData?.species}
        />
      </Label>
      <Label>
        Special infos:
        <Input
          name="info"
          type="text"
          maxLength="28"
          onChange={handleInputChange}
          value={formData?.info}
        />
      </Label>
      <ButtonWrapper>
        <FormButtonStyled>Update Plant</FormButtonStyled>
        <FormButton onClick={handleCancel} secondaryStyle>
          Cancel
        </FormButton>
        <FormButton secondaryStyle>Delete</FormButton>
      </ButtonWrapper>
    </Form>
  )

  function handleSubmit(event) {
    event.preventDefault()
    updatePlantData(formData, plant.id)
    event.target.reset()
    history.push(`/plant?id=${plant.id}`)
  }

  function handleCancel() {
    history.push(`/plant?id=${plant.id}`)
  }
}

const Form = styled.form`
  background-color: var(--primary-dark);
  display: grid;
  gap: 20px;
  padding: 0 40px;
`

const Label = styled.label`
  color: var(--form-font-color);
  display: flex;
  flex-wrap: wrap;
  font-size: 1.25rem;
`

const Input = styled.input`
  border-radius: 22px;
  border: none;
  color: var(--form-font-color);
  display: block;
  font-family: 'Josefin sans', sans-serif;
  font-size: 1rem;
  margin-top: 8px;
  padding: 14px 20px 10px;
  width: 100%;

  &:focus {
    box-shadow: 0 0 4px var(--shadow) inset;
    outline: none;
  }
`

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 40px 0 0;

  p {
    color: var(--form-font-color);
    font-size: 0.75rem;
    font-weight: 400;
  }
`

const FormButtonStyled = styled(FormButton)`
  grid-column: 1/3;
`
