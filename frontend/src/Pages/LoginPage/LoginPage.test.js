import { render } from '@testing-library/react'
import 'jest-styled-components'
import LoginPage from './LoginPage'

const userRegistrationMock = jest.fn()
const userLoginMock = jest.fn()
const setUserDataMock = jest.fn()

describe('LoginPage', () => {
  it('renders correctly', () => {
    const { container } = render(
      <LoginPage
        userRegistration={userRegistrationMock}
        userLogin={userLoginMock}
        setUserData={setUserDataMock}
        userData={{}}
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('renders the error modal when userData received error response', () => {
    const { getByText } = render(
      <LoginPage
        userRegistration={userRegistrationMock}
        userLogin={userLoginMock}
        setUserData={setUserDataMock}
        userData={{ error: 'lol error' }}
      />
    )
    expect(getByText('lol error')).toBeInTheDocument()
  })
})
