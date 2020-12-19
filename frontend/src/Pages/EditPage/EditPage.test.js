import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import 'jest-styled-components'
import { MemoryRouter } from 'react-router-dom'
import EditPage from './EditPage'
import defaultPlantImage from '../../assets/plant-images/default_plant.jpg'

const plantList = [
  {
    id: 2,
    name: 'Carl',
    species: 'Monstera deliciosa',
    specialInfo: 'variegated',
  },
]

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const updatePlandDataMock = jest.fn()
const deletePlantDataMock = jest.fn()

describe('EditPage', () => {
  it('renders correctly', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/edit-page?id=2']}>
        <EditPage
          updatePlantData={updatePlandDataMock}
          deletePlantData={deletePlantDataMock}
          plantList={plantList}
        />
      </MemoryRouter>
    )

    expect(container).toMatchSnapshot()
  })

  it('renders with the correct data', () => {
    const { getByLabelText, getByTestId } = render(
      <MemoryRouter initialEntries={['/edit-page?id=2']}>
        <EditPage
          updatePlantData={updatePlandDataMock}
          deletePlantData={deletePlantDataMock}
          plantList={plantList}
        />
      </MemoryRouter>
    )

    expect(getByLabelText(/Your plants name/i)).toHaveValue(plantList[0].name)
    expect(getByLabelText(/The species of your plant/i)).toHaveValue(
      plantList[0].species
    )
    expect(getByLabelText(/Special infos/i)).toHaveValue(
      plantList[0].specialInfo
    )
    expect(getByTestId('img-input-wrapper')).toHaveStyle(
      `background-image: url(${defaultPlantImage})`
    )
  })

  it('calls deletePlantData with the correct data by clicking the delete button and call history push', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/edit-page?id=2']}>
        <EditPage
          updatePlantData={updatePlandDataMock}
          deletePlantData={deletePlantDataMock}
          plantList={plantList}
        />
      </MemoryRouter>
    )
    user.click(getByRole('button', { name: /deleteicon/i }))
    expect(deletePlantDataMock).toHaveBeenCalledWith(plantList[0].id)
    expect(mockHistoryPush).toHaveBeenCalled()
  })

  it('renders the error modal when not finding the plant id', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/edit-page?id=3']}>
        <EditPage
          updatePlantData={updatePlandDataMock}
          deletePlantData={deletePlantDataMock}
          plantList={plantList}
        />
      </MemoryRouter>
    )
    expect(getByText(/plant not found/i)).toBeInTheDocument()
  })
})
