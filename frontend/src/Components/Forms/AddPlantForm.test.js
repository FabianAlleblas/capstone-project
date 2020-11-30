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
const onSubmitMock = jest.fn()

describe('AddPlantForm', () => {
  it('Calls onSubmit with correct data, resets form and calls history.push', () => {
    const { getByLabelText, getByText } = render(
      <AddPlantForm savePlantData={onSubmitMock} />
    )

    user.type(getByLabelText('Your plants name*:'), 'Bob')
    user.type(getByLabelText('The species of your plant*:'), 'Monstera')
    user.type(getByLabelText('Special infos:'), 'variegated')

    user.click(getByText('Add Plant'))

    expect(onSubmitMock).toHaveBeenCalledWith({
      name: 'Bob',
      species: 'Monstera',
      info: 'variegated',
    })

    expect(getByLabelText('Your plants name*:')).toHaveValue('')
    expect(getByLabelText('The species of your plant*:')).toHaveValue('')
    expect(getByLabelText('Special infos:')).toHaveValue('')

    expect(mockHistoryPush).toHaveBeenCalled()
  })
  it('Calls history.push by clicking the cancel button', () => {
    const { getByText } = render(<AddPlantForm savePlantData={onSubmitMock} />)

    user.click(getByText('Cancel'))

    expect(mockHistoryPush).toHaveBeenCalled()
  })
})
