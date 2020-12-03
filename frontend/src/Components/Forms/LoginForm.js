import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import useForm from '../../hooks/useForm'
import Button from '../Buttons/Button'

export default function LoginForm({ userRegistration, userLogin }) {
  LoginForm.propTypes = {
    userRegistration: PropTypes.func.isRequired,
  }

  const history = useHistory()
  const { handleInputChange, formData } = useForm()

  return (
    <Form onSubmit={handleSubmit}>
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
        <Button onClick={handleCancel} secondaryStyle>
          Sign Up
        </Button>
      </ButtonWrapper>
    </Form>
  )

  function handleSubmit(event) {
    event.preventDefault()
    userLogin(formData)
  }

  function handleCancel() {
    userRegistration(formData)
  }
}

const Form = styled.form`
  background-color: var(--primary-dark);
  display: grid;
  gap: 30px;
  padding: 0 40px;
  place-items: center;
  width: 100%;
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
  gap: 30px;
  padding: 20px 0 0;
  width: 50%;
`
