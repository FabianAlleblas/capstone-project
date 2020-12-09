import { render, fireEvent } from '@testing-library/react'
import user from '@testing-library/user-event'
import userEvent from '@testing-library/user-event'
import AddPlantForm from './AddPlantForm'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const onSubmitMock = jest.fn()

const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })

describe('AddPlantForm', () => {
  it('calls onSubmit with correct data, resets form and calls history.push', async () => {
    const { getByLabelText, getByText, getByTestId } = render(
      <AddPlantForm savePlantData={onSubmitMock} />
    )

    const imageInput = getByTestId('imgInput')

    userEvent.upload(imageInput, file)

    user.type(getByLabelText('Your plants name*:'), 'Bob')
    user.type(getByLabelText('The species of your plant*:'), 'Monstera')
    user.type(getByLabelText('Special infos:'), 'variegated')

    user.click(getByText('Add Plant'))

    expect(onSubmitMock).toHaveBeenCalledWith(
      {
        name: 'Bob',
        species: 'Monstera',
        specialInfo: 'variegated',
      },
      { name: 'chucknorris.png', value: undefined }
    )

    expect(getByLabelText('Your plants name*:')).toHaveValue('')
    expect(getByLabelText('The species of your plant*:')).toHaveValue('')
    expect(getByLabelText('Special infos:')).toHaveValue('')

    expect(mockHistoryPush).toHaveBeenCalled()
  })
  it('calls history.push by clicking the cancel button', () => {
    const { getByText } = render(<AddPlantForm savePlantData={onSubmitMock} />)

    user.click(getByText('Cancel'))

    expect(mockHistoryPush).toHaveBeenCalled()
  })
})
