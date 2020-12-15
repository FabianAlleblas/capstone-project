import { render } from '@testing-library/react'
import 'jest-styled-components'
import Header from './Header'

describe('Header', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Header>My Plants</Header>)

    expect(getByText(/My Plants/i)).toBeInTheDocument()
  })
  it('renders the correct SVGs', () => {
    const { getByText, getByTestId } = render(
      <Header showBackButton showEditButton>
        Helga
      </Header>
    )

    expect(getByText(/Helga/i)).toBeInTheDocument()
    expect(getByTestId(/arrow-icon/i)).toBeInTheDocument()
    expect(getByTestId(/edit-icon/i)).toBeInTheDocument()
  })
  it('renders the correct SVG', () => {
    const { getByText, getByTestId } = render(
      <Header showLogoutButton>My Plants</Header>
    )

    expect(getByText(/My Plants/i)).toBeInTheDocument()
    expect(getByTestId(/logout-icon/i)).toBeInTheDocument()
  })
})
