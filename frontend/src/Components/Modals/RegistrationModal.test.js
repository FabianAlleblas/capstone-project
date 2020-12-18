import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import 'jest-styled-components'
import RegistrationModal from './RegistrationModal'

const userRegistrationMock = jest.fn()
const setIsRegistrationMock = jest.fn()
const formData = { email: 'admin@admin.com', password: '123adminlol' }

describe('RegistrationModal', () => {
  it('renders correctly', () => {
    const { container } = render(
      <RegistrationModal
        userRegistration={userRegistrationMock}
        setIsRegistration={setIsRegistrationMock}
        formData={formData}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
  it('calls userRegistrationMock and setIsRegistrationMock with the correct data on confirm', () => {
    const { getByText } = render(
      <RegistrationModal
        userRegistration={userRegistrationMock}
        setIsRegistration={setIsRegistrationMock}
        formData={formData}
      />
    )
    user.click(getByText('Confirm'))

    expect(userRegistrationMock).toHaveBeenCalledWith(formData)
    expect(setIsRegistrationMock).toHaveBeenCalledWith(false)
  })
  it('calls setIsRegistrationMock with the correct data on cancel', () => {
    const { getByText } = render(
      <RegistrationModal
        userRegistration={userRegistrationMock}
        setIsRegistration={setIsRegistrationMock}
        formData={formData}
      />
    )
    user.click(getByText('Cancel'))

    expect(setIsRegistrationMock).toHaveBeenCalledWith(false)
  })
})
