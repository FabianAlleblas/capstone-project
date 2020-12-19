import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import 'jest-styled-components'
import ErrorModal from './ErrorModal'

const closeErrorModalMock = jest.fn()

describe('ErrorModal', () => {
  it('renders correctly', () => {
    const { container } = render(
      <ErrorModal closeErrorModal={closeErrorModalMock}>LoL Error!</ErrorModal>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
  it('calls closeErrorModalMock correctly', () => {
    const { getByText } = render(
      <ErrorModal closeErrorModal={closeErrorModalMock}>LoL Error!</ErrorModal>
    )
    user.click(getByText('Okay'))
    expect(closeErrorModalMock).toBeCalledWith({})
  })
})
