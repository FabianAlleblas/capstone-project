import { render } from '@testing-library/react'
import 'jest-styled-components'
import LoginPage from './LoadingPage'

describe('LoadingPage', () => {
  it('renders correctly', () => {
    const { container } = render(<LoginPage />)
    expect(container).toMatchSnapshot()
  })
})
