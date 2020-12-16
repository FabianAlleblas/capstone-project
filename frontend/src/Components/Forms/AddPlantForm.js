import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import useForm from '../../hooks/useForm'
import useImageUpload from '../../hooks/useImageUpload'
import Button from '../Buttons/Button'
import { AddImgIcon, ImgDeleteIcon } from '../Icons'

AddPlantForm.propTypes = {
  savePlantData: PropTypes.func.isRequired,
}

export default function AddPlantForm({ savePlantData }) {
  const history = useHistory()
  const { handleInputChange, formData } = useForm()
  const {
    picture,
    imageBase64,
    onChangePicture,
    deleteImg,
    isImageValid,
  } = useImageUpload()

  return (
    <Form onSubmit={handleSubmit}>
      <ImgInputWrapper src={imageBase64}>
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
          <ImgDeleteButton onClick={(event) => deleteImg(event)}>
            <ImgDeleteIcon />
          </ImgDeleteButton>
        )}
        {!isImageValid && <WarningText>max. size 1.5 MB</WarningText>}
      </ImgInputWrapper>
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
          name="specialInfo"
          type="text"
          placeholder="variegated"
          maxLength="28"
          onChange={handleInputChange}
        />
      </Label>
      <ButtonWrapper>
        <SubmitButton isImageValid={isImageValid}>Add Plant</SubmitButton>
        <Button onClick={handleCancel} secondaryStyle>
          Cancel
        </Button>
      </ButtonWrapper>
    </Form>
  )

  function handleSubmit(event) {
    const imageData = { name: picture?.name, value: imageBase64 }
    event.preventDefault()

    if (isImageValid) {
      savePlantData(formData, imageData)
      event.target.reset()
      history.push('/')
    }
  }

  function handleCancel() {
    history.push('/')
  }
}

const Form = styled.form`
  background-color: var(--primary-dark);
  display: grid;
  place-content: center;
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
`

const SubmitButton = styled(Button)`
  opacity: ${(props) => (props.isImageValid ? '1' : '0.5')};
`
