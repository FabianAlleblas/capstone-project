import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components/macro'
import useForm from '../../hooks/useForm'
import Button from '../Buttons/Button'
import RegistrationModal from '../Modals/RegistrationModal'

LoginForm.propTypes = {
  userRegistration: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired,
}

export default function LoginForm({ userRegistration, userLogin }) {
  const [isRegistration, setIsRegistration] = useState(false)
  const {
    handleInputChange,
    formData,
    validatePassword,
    isPasswordValid,
  } = useForm()

  return (
    <Form onSubmit={handleLogin}>
      <Input
        name="email"
        type="email"
        placeholder="E-Mail"
        onChange={handleInputChange}
        required
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleInputChange}
        required
      />
      {!isPasswordValid && (
        <WarningText>
          Password must contain at least 1 digit, 1 capital letter, 1 special
          character and to have a length of min. 8 characters
        </WarningText>
      )}
      <ButtonWrapper>
        <Button>Login</Button>
        <Button onClick={openRegistrationModal} secondaryStyle>
          Sign Up
        </Button>
      </ButtonWrapper>
      {isRegistration && (
        <RegistrationModalFixed
          userRegistration={userRegistration}
          setIsRegistration={setIsRegistration}
          formData={formData}
        />
      )}
    </Form>
  )

  function handleLogin(event) {
    const passwordInput = document.querySelector('Input', { name: /password/i })

    event.preventDefault()
    userLogin(formData)
    passwordInput.blur()
  }

  function openRegistrationModal() {
    if (formData.email && formData.password) {
      validatePassword() && setIsRegistration(true)
    } else {
      alert('Choose a email and a password')
    }
  }
}

const Form = styled.form`
  background-color: var(--primary-dark);
  display: grid;
  gap: 20px;
  place-items: center;
  width: 100%;
`

const Input = styled.input`
  border-radius: 22px;
  border: none;
  color: var(--form-font-color);
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
  display: grid;
  gap: 20px;
  padding: 20px 0 0;
  width: 60%;
`

const WarningText = styled.p`
  color: var(--warning-color);
  font-size: 0.75rem;
  text-align: center;
`
const RegistrationModalFixed = styled(RegistrationModal)`
  height: 100vh;
  left: 0;
  position: absolute;
  top: 0;
`
