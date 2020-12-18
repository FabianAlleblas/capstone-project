import { render } from '@testing-library/react'
import 'jest-styled-components'
import Header from './Header'

describe('Header', () => {
  it('reders with the correct text and logout button', () => {
    const { getByText, getByRole, container } = render(
      <Header showLogoutButton>My Plants</Header>
    )

    expect(getByText('My Plants')).toBeInTheDocument()
    expect(getByRole('button', { name: /LogoutIcon/i })).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
  it('reders with the back and edit button', () => {
    const { getByRole, container } = render(
      <Header showBackButton showEditButton>
        Helga
      </Header>
    )

    expect(getByRole('button', { name: /ArrowIcon/i })).toBeInTheDocument()
    expect(getByRole('button', { name: /EditIcon/i })).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('reders with the delete button', () => {
    const { getByRole, container } = render(
      <Header showDeleteButton>Edit your Plant</Header>
    )

    expect(getByRole('button', { name: /DeleteIcon/i })).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
  it('renders the header without a box-shadow', () => {
    const { getByTestId, container } = render(
      <Header secondaryStyle>Add plant</Header>
    )

    expect(getByTestId('heading-container')).not.toHaveStyle(
      'box-shadow: 0 0 4px var(--shadow)'
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
