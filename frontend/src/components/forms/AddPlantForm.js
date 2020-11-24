import { useState } from 'react'
import styled from 'styled-components/macro'
import FormButton from '../buttons/FormButton'

export default function AddPlantForm() {
  const [plant, setPlant] = useState({
    name: '',
    species: '',
  })

  function handleInputChange(event) {
    const fieldName = event.target.name
    const fieldValue = event.target.value
    setPlant({ ...plant, [fieldName]: fieldValue })
  }

  function addPlant(e) {
    e.preventDefault()
    console.log(plant)
  }

  function handleCancel() {
    console.log('lol')
  }

  return (
    <Form onSubmit={addPlant}>
      <Label>
        Your plants name:
        <Input
          name="name"
          type="text"
          placeholder="Samantha"
          onChange={handleInputChange}
        />
      </Label>
      <Label>
        The species of your plant:
        <Input
          name="species"
          type="text"
          placeholder="Monstera deliciosa"
          onChange={handleInputChange}
        />
      </Label>
      <ButtonWrapper>
        <FormButton>Add Plant</FormButton>
        <FormButton secondary={true} onClick={handleCancel}>
          Cancel
        </FormButton>
      </ButtonWrapper>
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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`
