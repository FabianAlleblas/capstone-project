import styled from 'styled-components/macro'

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
        <button>Add Plant</button>
        <button>Cancel</button>
      </div>
    </Form>
  )
}

const Form = styled.form`
  background-color: var(--primary-dark);
  display: grid;
  gap: 24px;
  align-items: stretch;
  padding: 0 40px;
`

const Label = styled.label`
  color: var(--form-font-color);
  font-size: 1.25rem;
  gap: 8px;
  display: flex;
  flex-wrap: wrap;
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
