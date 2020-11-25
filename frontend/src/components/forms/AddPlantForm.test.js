import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import AddPlantForm from './AddPlantForm'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('AddPlantForm', () => {
  it('calls onSubmit with correct data and resets form', () => {
    const onSubmitMock = jest.fn()
    const { getByLabelText, getByText } = render(
      <AddPlantForm savePlantData={onSubmitMock} />
    )

    user.type(getByLabelText('Your plants name:'), 'Bob')
    user.type(getByLabelText('The species of your plant:'), 'Monstera')

    user.click(getByText('Add Plant'))

    expect(onSubmitMock).toHaveBeenCalledWith({
      id: '',
      name: 'Bob',
      species: 'Monstera',
    })

    expect(getByLabelText('Your plants name:')).toHaveValue('')
    expect(getByLabelText('The species of your plant:')).toHaveValue('')
  })
})
