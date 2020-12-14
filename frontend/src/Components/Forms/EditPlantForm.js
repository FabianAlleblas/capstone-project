import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import defaultPlantImage from '../../assets/plant-images/default_plant.jpg'
import useForm from '../../hooks/useForm'
import useImageUpload from '../../hooks/useImageUpload'
import Button from '../Buttons/Button'
import { AddImgIcon, ImgDeleteIcon } from '../Icons'

EditPlantForm.propTypes = {
  updatePlantData: PropTypes.func.isRequired,
  deletePlantData: PropTypes.func.isRequired,
  plant: PropTypes.object.isRequired,
}

export default function EditPlantForm({
  updatePlantData,
  deletePlantData,
  plant,
}) {
  const history = useHistory()
  const { handleInputChange, formData } = useForm(plant)
  const { picture, imageBase64, onChangePicture, deleteImg } = useImageUpload()

  return (
    <Form onSubmit={handleSubmit}>
      <ImgInputWrapper src={imageBase64 ?? plant.image ?? defaultPlantImage}>
        <ImgInput
          alt="image-input"
          name="image"
          type="file"
          onChange={onChangePicture}
          accept="image/png, image/jpeg"
        />
        {!imageBase64 ? (
          <AddImgIcon />
        ) : (
          <ImgDeleteButton
            aria-label="image-delete-button"
            onClick={(event) => deleteImg(event)}
          >
            <ImgDeleteIcon />
          </ImgDeleteButton>
        )}
      </ImgInputWrapper>
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
          name="specialInfo"
          type="text"
          maxLength="28"
          onChange={handleInputChange}
          value={formData?.specialInfo ?? ''}
        />
      </Label>
      <ButtonWrapper>
        <ButtonStyled>Update Plant</ButtonStyled>
        <Button onClick={handleCancel} secondaryStyle>
          Cancel
        </Button>
        <Button onClick={handleDelete} secondaryStyle>
          Delete
        </Button>
      </ButtonWrapper>
    </Form>
  )

  function handleSubmit(event) {
    const ImageData = { name: picture?.name, value: imageBase64 }
    delete formData?.image

    event.preventDefault()
    updatePlantData(formData, ImageData, plant.id)
    event.target.reset()
    history.push(`/plant?id=${plant.id}`)
  }

  function handleCancel() {
    history.push(`/plant?id=${plant.id}`)
  }

  function handleDelete() {
    deletePlantData(plant.id)
    history.push('/')
  }
}

const Form = styled.form`
  background-color: var(--primary-dark);
  display: grid;
  gap: 20px;
  padding: 0 40px;
`

const ImgInputWrapper = styled.label`
  align-items: center;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover, contain;
  border-radius: 50%;
  border: ${(props) => !props.src && '4px dashed var(--primary-light)'};
  display: flex;
  height: 148px;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  width: 148px;

  svg {
    margin: 0 4px 4px 0;
  }
`

const ImgDeleteButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 0;
  top: 0;
`

const ImgInput = styled.input`
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 0.1px;
  z-index: -1;
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
  padding: 20px 0 0;
`

const ButtonStyled = styled(Button)`
  grid-column: 1/3;
`
