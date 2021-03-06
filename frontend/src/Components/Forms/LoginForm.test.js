import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import LoginForm from './LoginForm'

const registrationMock = jest.fn()
const loginMock = jest.fn()
window.alert = jest.fn()

describe('LoginForm', () => {
  it('renders correctly', () => {
    const { container } = render(
      <LoginForm userRegistration={registrationMock} userLogin={loginMock} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
  it('calls loginMock with the correct data', () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginForm userRegistration={registrationMock} userLogin={loginMock} />
    )

    user.type(getByPlaceholderText('E-Mail'), 'admin@admin.com')
    user.type(getByPlaceholderText('Password'), 'admin')

    user.click(getByText('Login'))

    expect(loginMock).toHaveBeenCalledWith({
      email: 'admin@admin.com',
      password: 'admin',
    })
  })
  it('calls alert() on registrationMock because of empty input', () => {
    const { getByText } = render(
      <LoginForm userRegistration={registrationMock} userLogin={loginMock} />
    )

    user.click(getByText('Sign Up'))

    expect(window.alert).toHaveBeenCalled()
  })
  it('shows a warning text because of invalid password', () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginForm userRegistration={registrationMock} userLogin={loginMock} />
    )

    user.type(getByPlaceholderText('E-Mail'), 'admin@admin.com')
    user.type(getByPlaceholderText('Password'), 'admin')

    user.click(getByText('Sign Up'))

    const warningText = getByText(
      'Password must contain at least 1 digit, 1 capital letter, 1 special character and to have a length of min. 8 characters'
    )

    expect(warningText).toBeInTheDocument()
  })
  it('shows the sign up modal on registrationMock', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(
      <LoginForm userRegistration={registrationMock} userLogin={loginMock} />
    )

    user.type(getByPlaceholderText('E-Mail'), 'admin@admin.com')
    user.type(getByPlaceholderText('Password'), '##Admin12')

    user.click(getByText('Sign Up'))

    const RegistrationModal = getByRole('heading', {
      name: /Please confirm your registration!/i,
    })

    expect(RegistrationModal).toBeInTheDocument()
  })
})
