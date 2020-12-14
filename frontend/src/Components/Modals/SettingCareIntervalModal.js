import PropTypes from 'prop-types'
import styled from 'styled-components'
import useForm from '../../hooks/useForm'
import Button from '../Buttons/Button'
import { ImgDeleteIcon } from '../Icons'

SettingCareIntervalModal.propTypes = {
  className: PropTypes.string,
  isFertilizer: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  setShowCareSetting: PropTypes.func.isRequired,
  updateCareInterval: PropTypes.func.isRequired,
  plantId: PropTypes.number.isRequired,
}

export default function SettingCareIntervalModal({
  className,
  isFertilizer,
  onClick,
  setShowCareSetting,
  updateCareInterval,
  plantId,
}) {
  const { handleInputChange, formData } = useForm()

  return (
    <Wrapper className={className}>
      <Modal>
        <ClosingButton onClick={onClick}>
          <ClosingIcon />
        </ClosingButton>
        <Form onSubmit={saveCareInterval}>
          <Label>
            Set your preferred {isFertilizer ? 'fertilizing' : 'watering'}{' '}
            interval (default: {isFertilizer ? '4 weeks' : '10 days'}):
            <Input
              name={isFertilizer ? 'fertilizerInterval' : 'waterInterval'}
              type="number"
              placeholder="1-99"
              min="1"
              max="99"
              onChange={handleInputChange}
              required
            />
          </Label>
          <ButtonStyled>Save</ButtonStyled>
        </Form>
      </Modal>
    </Wrapper>
  )

  function saveCareInterval(event) {
    event.preventDefault()
    updateCareInterval(plantId, formData)
    setShowCareSetting({})
  }
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`

const Modal = styled.div`
  background-color: var(--primary-dark);
  border-radius: 20px;
  box-shadow: 4px 4px 10px var(--shadow);
  padding: 10px;
  width: 75%;
`

const ClosingButton = styled.button`
  border: none;
  background-color: transparent;
  width: 18px;
`

const ClosingIcon = styled(ImgDeleteIcon)`
  width: 18px;
  height: 18px;
`

const Form = styled.form`
  padding: 10px;
  display: grid;
  gap: 10px;
  justify-items: center;
`
const Label = styled.label`
  display: flex;
  flex-wrap: wrap;
  color: var(--form-font-color);
  justify-content: center;
  text-align: center;
  font-size: 1rem;
`

const Input = styled.input`
  border-radius: 18px;
  border: none;
  color: var(--form-font-color);
  font-family: 'Josefin sans', sans-serif;
  font-size: 0.75rem;
  margin-top: 10px;
  padding: 10px 10px;
  width: 30%;

  &:focus {
    box-shadow: 0 0 4px var(--shadow) inset;
    outline: none;
  }
`

const ButtonStyled = styled(Button)`
  scale: 0.75;
  width: 75%;
`
