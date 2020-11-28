import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import useForm from '../../hooks/useForm'
import FormButton from '../Buttons/FormButton'

export default function AddPlantForm({ savePlantData }) {
  AddPlantForm.propTypes = {
    savePlantData: PropTypes.func,
  }

  const history = useHistory()
  const initialPlant = {
    name: '',
    species: '',
    info: '',
  }

  const { handleInputChange, formData } = useForm(initialPlant)

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Your plants name*:
        <Input
          name="name"
          type="text"
          placeholder="Bob"
          maxLength="28"
          onChange={handleInputChange}
          required
        />
      </Label>
      <Label>
        The species of your plant*:
        <Input
          name="species"
          type="text"
          placeholder="Monstera deliciosa"
          maxLength="28"
          onChange={handleInputChange}
          required
        />
      </Label>
      <Label>
        Special infos:
        <Input
          name="info"
          type="text"
          placeholder="variegated"
          maxLength="28"
          onChange={handleInputChange}
        />
      </Label>
      <ButtonWrapper>
        <FormButton>Add Plant</FormButton>
        <FormButton onClick={handleCancel} secondaryStyle>
          Cancel
        </FormButton>
        <p>* required</p>
      </ButtonWrapper>
    </Form>
  )

  function handleSubmit(e) {
    e.preventDefault()
    savePlantData(formData)
    e.target.reset()
    history.push('/')
  }

  function handleCancel() {
    history.push('/')
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
