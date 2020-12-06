import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import plants from '../../Data/plants.json'
import EditPlantForm from './EditPlantForm'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const onSubmitMock = jest.fn()
const onDeleteMock = jest.fn()

const plant = plants[0]

describe('AddPlantForm', () => {
  it('Is renders with the correct input values', () => {
    const { getByLabelText } = render(
      <EditPlantForm
        updatePlantData={onSubmitMock}
        deletePlantData={onDeleteMock}
        plant={plant}
      />
    )

    expect(getByLabelText('Your plants name*:')).toHaveValue(plant.name)
    expect(getByLabelText('The species of your plant*:')).toHaveValue(
      plant.species
    )
    expect(getByLabelText('Special infos:')).toHaveValue(plant.info)
  })

  it('Calls history.push by clicking the cancel button', () => {
    const { getByText } = render(
      <EditPlantForm
        updatePlantData={onSubmitMock}
        deletePlantData={onDeleteMock}
        plant={plant}
      />
    )

    user.click(getByText('Cancel'))

    expect(mockHistoryPush).toHaveBeenCalled()
  })

  it('Calls the right function and history.push by clicking the delete button', () => {
    const { getByText } = render(
      <EditPlantForm
        updatePlantData={onSubmitMock}
        deletePlantData={onDeleteMock}
        plant={plant}
      />
    )

    user.click(getByText('Delete'))

    expect(onDeleteMock).toHaveBeenCalled()
    expect(mockHistoryPush).toHaveBeenCalled()
  })
})
