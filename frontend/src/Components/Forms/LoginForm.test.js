import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import LoginForm from './LoginForm'

const onSubmitMock = jest.fn()

describe('AddPlantForm', () => {
  it('calls onSubmit with correct data, resets form and calls onSubmitMock', () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginForm userRegistration={onSubmitMock} userLogin={onSubmitMock} />
    )

    user.type(getByPlaceholderText('E-Mail'), 'john@doe.com')
    user.type(getByPlaceholderText('Password'), '12345')

    user.click(getByText('Login'))

    expect(onSubmitMock).toHaveBeenCalledWith({
      email: 'john@doe.com',
      password: '12345',
    })

    expect(getByPlaceholderText('E-Mail')).toHaveValue('')
    expect(getByPlaceholderText('Password')).toHaveValue('')

    expect(onSubmitMock).toHaveBeenCalled()
  })
  it('calls onSubmitMock by clicking the sign up button', () => {
    const { getByText } = render(
      <LoginForm userRegistration={onSubmitMock} userLogin={onSubmitMock} />
    )

    user.click(getByText('Sign Up'))

    expect(onSubmitMock).toHaveBeenCalled()
  })
})
