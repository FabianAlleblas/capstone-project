import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import useForm from '../../hooks/useForm'
import Button from '../Buttons/Button'

LoginForm.propTypes = {
  userRegistration: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired,
}

export default function LoginForm({ userRegistration, userLogin }) {
  const { handleInputChange, formData } = useForm()

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
      <ButtonWrapper>
        <Button>Login</Button>
        <Button onClick={handleRegistration} secondaryStyle>
          Sign Up
        </Button>
      </ButtonWrapper>
    </Form>
  )

  function handleLogin(event) {
    event.preventDefault()
    userLogin(formData)
    event.target.reset()
  }

  function handleRegistration() {
    userRegistration(formData)
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
