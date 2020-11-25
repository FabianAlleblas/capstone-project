import { render } from '@testing-library/react'
import 'jest-styled-components'
import Header from './Header'

describe('Header', () => {
  it('renders correctly', () => {
    const { container, getByText } = render(<Header text="My Plants" />)

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText(/My Plants/i)).toBeInTheDocument()
  })
})
