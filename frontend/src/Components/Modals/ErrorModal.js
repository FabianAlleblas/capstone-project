import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '../Buttons/Button'

ErrorModal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
  closeErrorModal: PropTypes.func.isRequired,
}

export default function ErrorModal({ children, closeErrorModal, className }) {
  return (
    <Wrapper className={className}>
      <Modal>
        <Text>{children}</Text>
        <ModalButton onClick={closeModal}>Okay</ModalButton>
      </Modal>
    </Wrapper>
  )

  function closeModal() {
    closeErrorModal()
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
  width: 75%;
  place-items: center;
`

const Text = styled.p`
  color: var(--form-font-color);
  font-size: 1.25rem;
`

const ModalButton = styled(Button)`
  width: 50%;
`
