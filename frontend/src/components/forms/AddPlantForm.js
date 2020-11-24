import styled from 'styled-components/macro'
import FormButton from '../buttons/FormButton'

export default function AddPlantForm() {
  return (
    <Form>
      <Label>
        Your plants name:
        <Input type="text" placeholder="Samantha" />
      </Label>
      <Label>
        The species of your plant:
        <Input type="text" placeholder="Monstera deliciosa" />
      </Label>
      <div>
        <FormButton>Add Plant</FormButton>
        <FormButton secondary={true}>Cancel</FormButton>
      </div>
    </Form>
  )
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
