import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '../Buttons/Button'

RegistrationModal.propTypes = {
  className: PropTypes.string,
  userRegistration: PropTypes.func.isRequired,
  setIsRegistration: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
}

export default function RegistrationModal({
  className,
  userRegistration,
  setIsRegistration,
  formData,
}) {
  return (
    <Wrapper className={className}>
      <Modal>
        <Heading>Please confirm your registration!</Heading>
        <Text>
          Keep in mind, this app is just a reminding tool. Check your plant and
          your soil frequently and adjust the intervals.
          <br />
          <br />
          This app is not responsible for under or overwatering your plant.
          <br />
          <br />
          <br />
          For demonstration purpose the max amount of plants is limited to 6 per
          user!
        </Text>
        <ButtonWrapper>
          <ModalButton onClick={handleRegistration}>Confirm</ModalButton>
          <ModalButton secondaryStyle onClick={closeModal}>
            Cancel
          </ModalButton>
        </ButtonWrapper>
      </Modal>
    </Wrapper>
  )

  function handleRegistration() {
    userRegistration(formData)
    setIsRegistration(false)
  }

  function closeModal() {
    setIsRegistration(false)
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
  display: grid;
  gap: 24px;
  padding: 20px;
  place-items: center;
  width: 90%;
`

const Heading = styled.h2`
  color: var(--form-font-color);
  font-size: 1.5rem;
  text-align: center;
`

const Text = styled.p`
  color: var(--form-font-color);
  font-size: 1.1rem;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

const ModalButton = styled(Button)`
  width: 50%;
  margin: 4px;
`
