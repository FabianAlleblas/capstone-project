import PropTypes from 'prop-types'
import styled from 'styled-components'
import useForm from '../../hooks/useForm'
import Button from '../Buttons/Button'
import { CloseIcon } from '../Icons'

SettingCareIntervalModal.propTypes = {
  isFertilizer: PropTypes.bool,
  setShowCareSetting: PropTypes.func.isRequired,
  updateCareInterval: PropTypes.func.isRequired,
  plantId: PropTypes.number.isRequired,
  className: PropTypes.string,
}

export default function SettingCareIntervalModal({
  isFertilizer,
  setShowCareSetting,
  updateCareInterval,
  plantId,
  className,
}) {
  const { handleInputChange, formData } = useForm()

  return (
    <Wrapper className={className}>
      <Modal>
        <ClosingButton onClick={closeCareSetting}>
          <CloseIcon />
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
    setShowCareSetting()
  }

  function closeCareSetting() {
    setShowCareSetting()
  }
}

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
  width: 100%;
  z-index: 10;
`

const Modal = styled.div`
  background-color: var(--primary-dark);
  border-radius: 20px;
  box-shadow: 4px 4px 10px var(--shadow);
  padding: 10px;
  width: 80%;
`

const ClosingButton = styled.button`
  border: none;
  background-color: transparent;
  width: 18px;
`

const Form = styled.form`
  display: grid;
  gap: 20px;
  justify-items: center;
  padding: 14px 10px 10px;
`
const Label = styled.label`
  color: var(--form-font-color);
  display: flex;
  flex-wrap: wrap;
  font-size: 1.2rem;
  justify-content: center;
  text-align: center;
`

const Input = styled.input`
  border-radius: 18px;
  border: none;
  color: var(--form-font-color);
  font-family: 'Josefin sans', sans-serif;
  font-size: 1rem;
  margin-top: 20px;
  padding: 8px 14px;
  width: 40%;

  &:focus {
    box-shadow: 0 0 4px var(--shadow) inset;
    outline: none;
  }
`

const ButtonStyled = styled(Button)`
  scale: 0.8;
  width: 75%;
`
