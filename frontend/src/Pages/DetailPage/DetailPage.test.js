import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import 'jest-styled-components'
import { MemoryRouter } from 'react-router-dom'
import defaultPlantImage from '../../assets/plant-images/default_plant.jpg'
import DetailPage from './DetailPage'

const plantList = [
  {
    id: 2,
    name: 'Carl',
    species: 'Monstera deliciosa',
    specialInfo: 'variegated',
    daysLeft: 5,
    weeksLeft: 2,
    waterInterval: 10,
    fertilizerInterval: 4,
  },
]

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const resetTimerMock = jest.fn()
const updateCareIntervalMock = jest.fn()

describe('DetailPage', () => {
  it('renders correctly', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/plant?id=2']}>
        <DetailPage
          plantList={plantList}
          resetTimer={resetTimerMock}
          updateCareInterval={updateCareIntervalMock}
        />
      </MemoryRouter>
    )
    expect(container).toMatchSnapshot()
  })

  it('shows the correct data', () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={['/plant?id=2']}>
        <DetailPage
          plantList={plantList}
          resetTimer={resetTimerMock}
          updateCareInterval={updateCareIntervalMock}
        />
      </MemoryRouter>
    )

    const WaterBar = getByTestId('water-indicator')
    const FertilizerBar = getByTestId('fertilizer-indicator')

    expect(WaterBar).toHaveStyle('width: 50%;')
    expect(FertilizerBar).toHaveStyle('width: 50%')

    expect(getByText(/carl/i)).toBeInTheDocument()

    expect(getByTestId('image-frame')).toHaveStyle(
      `background-image: url(${defaultPlantImage})`
    )
  })

  it('calls history push by clicking the back button', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/plant?id=2']}>
        <DetailPage
          plantList={plantList}
          resetTimer={resetTimerMock}
          updateCareInterval={updateCareIntervalMock}
        />
      </MemoryRouter>
    )

    user.click(getByRole('button', { name: /arrowicon/i }))
    expect(mockHistoryPush).toHaveBeenCalled()
  })

  it('calls history push with the correct data by clicking the edit button', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/plant?id=2']}>
        <DetailPage
          plantList={plantList}
          resetTimer={resetTimerMock}
          updateCareInterval={updateCareIntervalMock}
        />
      </MemoryRouter>
    )

    user.click(getByRole('button', { name: /editicon/i }))
    expect(mockHistoryPush).toHaveBeenCalledWith('/edit-plant?id=2')
  })

  it('renders the error modal without a correct id', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/plant?id=3']}>
        <DetailPage
          plantList={plantList}
          resetTimer={resetTimerMock}
          updateCareInterval={updateCareIntervalMock}
        />
      </MemoryRouter>
    )

    expect(getByText(/plant not found/i)).toBeInTheDocument()
  })
})
