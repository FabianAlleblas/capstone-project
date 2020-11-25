import styled from 'styled-components/macro'
import useForm from '../../hooks/useForm'
import FormButton from '../buttons/FormButton'
import { useHistory } from 'react-router-dom'

export default function AddPlantForm({ savePlantData }) {
  const history = useHistory()
  const initialInput = {
    id: '',
    name: '',
    species: '',
  }

  const { handleInputChange, formData } = useForm(initialInput)

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Your plants name:
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
        The species of your plant:
        <Input
          name="species"
          type="text"
          placeholder="Monstera deliciosa"
          maxLength="28"
          onChange={handleInputChange}
          required
        />
      </Label>
      <ButtonWrapper>
        <FormButton>Add Plant</FormButton>
        <FormButton secondary onClick={handleCancel}>
          Cancel
        </FormButton>
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
  align-items: stretch;
  background-color: var(--primary-dark);
  display: grid;
  gap: 24px;
  padding: 0 40px;
`

const Label = styled.label`
  color: var(--form-font-color);
  display: flex;
  flex-wrap: wrap;
  font-size: 1.25rem;
  gap: 8px;
`

const Input = styled.input`
  border-radius: 22px;
  border: none;
  color: var(--form-font-color);
  display: block;
  font-family: 'Josefin sans', sans-serif;
  font-size: 1rem;
  padding: 14px 20px 10px;
  width: 100%;

  &:focus {
    box-shadow: 0 0 4px var(--shadow) inset;
    outline: none;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`
