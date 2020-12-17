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
  plant: PropTypes.object.isRequired,
}

export default function EditPlantForm({ updatePlantData, plant }) {
  const history = useHistory()
  const { handleInputChange, formData } = useForm(plant)
  const {
    picture,
    imageBase64,
    onChangePicture,
    deleteImg,
    isImageValid,
  } = useImageUpload()

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
          <ImgDeleteButton type="button" onClick={() => deleteImg()}>
            <ImgDeleteIcon />
          </ImgDeleteButton>
        )}
        {!isImageValid && <WarningText>max. size 4 MB</WarningText>}
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
        <ButtonStyled isImageValid={isImageValid}>Update</ButtonStyled>
        <Button onClick={handleCancel} secondaryStyle>
          Cancel
        </Button>
      </ButtonWrapper>
    </Form>
  )

  function handleSubmit(event) {
    event.preventDefault()

    if (isImageValid) {
      const ImageData = { name: picture?.name, value: imageBase64 }
      delete formData?.image

      updatePlantData(formData, ImageData, plant.id)
      event.target.reset()
      history.push(`/plant?id=${plant.id}`)
    }
  }

  function handleCancel() {
    history.push(`/plant?id=${plant.id}`)
  }
}

const Form = styled.form`
  background-color: var(--primary-dark);
  display: grid;
  gap: 20px;
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
  margin: 0 auto 10px;
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

const WarningText = styled.p`
  background-color: var(--primary-light);
  border-radius: 30px;
  bottom: -10px;
  color: var(--warning-color);
  font-size: 1rem;
  padding: 4px 12px;
  position: absolute;
  text-align: center;
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
  font-size: 1.2rem;
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
  gap: 20px;
  grid-template-columns: 1fr 1fr;
  padding: 30px 0 0;
`

const ButtonStyled = styled(Button)`
  opacity: ${(props) => (props.isImageValid ? '1' : '0.5')};
`
