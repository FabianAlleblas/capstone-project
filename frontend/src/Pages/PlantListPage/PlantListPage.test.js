import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import 'jest-styled-components'
import plants from '../../data/plants.json'
import PlantListPage from './PlantListPage'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const userLogoutMock = jest.fn()

describe('PlantListPage', () => {
  it('renders correctly', () => {
    const { container } = render(
      <PlantListPage plantList={plants} userLogout={userLogoutMock} />
    )

    expect(container).toMatchSnapshot()
  })

  it('displays the plant names', () => {
    const { getByText } = render(
      <PlantListPage plantList={plants} userLogout={userLogoutMock} />
    )

    plants.forEach(({ name }) => expect(getByText(name)).toBeInTheDocument())
  })

  it('calls userLogoutMock by clicking the logout button', () => {
    const { getByRole } = render(
      <PlantListPage plantList={plants} userLogout={userLogoutMock} />
    )

    user.click(getByRole('button', { name: /logouticon/i }))
    expect(userLogoutMock).toHaveBeenCalled()
  })

  it('calls history push with the correct dta by clicking on a card item', () => {
    const { getByText } = render(
      <PlantListPage plantList={plants} userLogout={userLogoutMock} />
    )

    user.click(getByText(plants[0].name))
    expect(mockHistoryPush).toHaveBeenCalledWith(`/plant?id=${plants[0].id}`)
  })
})
