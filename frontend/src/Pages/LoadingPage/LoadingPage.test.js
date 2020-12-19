import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import 'jest-styled-components'
import { MemoryRouter } from 'react-router-dom'
import LoginPage from './LoadingPage'
import LoadingPage from './LoadingPage'

describe('LoadingPage', () => {
  it('renders correctly', () => {
    const { container } = render(<LoginPage />)
    expect(container).toMatchSnapshot()
  })
})
