import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import useForm from '../../hooks/useForm'
import FormButton from '../Buttons/FormButton'

export default function EditPlantForm({ updatePlantData, plantList }) {
  EditPlantForm.propTypes = {
    updatePlantData: PropTypes.func.isRequired,
    plantList: PropTypes.array.isRequired,
  }

  const query = useQuery()
  const history = useHistory()
  const plantId = parseInt(query.get('id'))
  const plant = plantList.find((plant) => plant.id === plantId ?? false)

  const { handleInputChange, formData } = useForm(plant)

  if (!plant) {
    return <div>Plant not found!</div>
  }

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
        <FormButton>Update</FormButton>
        <FormButton onClick={handleCancel} secondaryStyle>
          Cancel
        </FormButton>
        <p>* required</p>
      </ButtonWrapper>
    </Form>
  )

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

  function handleSubmit(e) {
    e.preventDefault()
    updatePlantData(formData, plantId)
    e.target.reset()
    history.push(`/plant?id=${plantId}`)
  }

  function handleCancel() {
    history.push(`/plant?id=${plantId}`)
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
