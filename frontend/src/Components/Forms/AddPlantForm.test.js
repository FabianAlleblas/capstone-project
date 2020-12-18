import { render, waitFor } from '@testing-library/react'
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
const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })

describe('AddPlantForm', () => {
  it('shows a preview when a image is added to file input', async () => {
    const { getByAltText, getByTestId, getByRole } = render(
      <AddPlantForm savePlantData={onSubmitMock} />
    )

    const imageInput = getByAltText('image-input')
    const ImgInputWrapper = getByTestId('img-input-wrapper')

    user.upload(imageInput, file)

    await waitFor(() => getByRole('button', { name: /ImgDeleteIcon/i }))

    expect(ImgInputWrapper).toHaveStyle(
      'background-image: url(data:image/png;base64,KOKMkOKWoV/ilqEp)'
    )
  })
  it('calls on submit with the correct data, resets the form and calls history push', async () => {
    const { getByLabelText, getByText, getByAltText, getByRole } = render(
      <AddPlantForm savePlantData={onSubmitMock} />
    )

    const imageInput = getByAltText('image-input')

    user.upload(imageInput, file)

    await waitFor(() => getByRole('button', { name: /ImgDeleteIcon/i }))

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
      {
        name: 'chucknorris.png',
        value: 'data:image/png;base64,KOKMkOKWoV/ilqEp',
      }
    )

    expect(getByLabelText('Your plants name*:')).toHaveValue('')
    expect(getByLabelText('The species of your plant*:')).toHaveValue('')
    expect(getByLabelText('Special infos:')).toHaveValue('')

    expect(mockHistoryPush).toHaveBeenCalled()
  })
  it('calls history push by clicking cancel', () => {
    const { getByText } = render(<AddPlantForm savePlantData={onSubmitMock} />)

    user.click(getByText('Cancel'))

    expect(mockHistoryPush).toHaveBeenCalled()
  })
})
