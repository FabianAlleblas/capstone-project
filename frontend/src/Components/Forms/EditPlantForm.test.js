import { render, waitFor } from '@testing-library/react'
import {
  default as user,
  default as userEvent,
} from '@testing-library/user-event'
import EditPlantForm from './EditPlantForm'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const onSubmitMock = jest.fn()
const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
const plant = {
  id: 1,
  name: 'Bob',
  species: 'Monstera',
  specialInfo: 'variegated',
  image: 'http://example.com/example.jpg',
}

describe('EditPlantForm', () => {
  it('renders correctly', () => {
    const { container } = render(
      <EditPlantForm updatePlantData={onSubmitMock} plant={plant} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
  it('renders with the correct input values', () => {
    const { getByLabelText, getByTestId } = render(
      <EditPlantForm updatePlantData={onSubmitMock} plant={plant} />
    )

    expect(getByLabelText('Your plants name*:')).toHaveValue(plant.name)
    expect(getByLabelText('The species of your plant*:')).toHaveValue(
      plant.species
    )
    expect(getByLabelText('Special infos:')).toHaveValue(plant.specialInfo)
    expect(getByTestId('img-input-wrapper')).toHaveStyle(
      `background-image: url(${plant.image})`
    )
  })

  it('shows a preview when a image is added to file input', async () => {
    const { getByAltText, getByTestId, getByRole } = render(
      <EditPlantForm updatePlantData={onSubmitMock} plant={plant} />
    )

    const imageInput = getByAltText('image-input')
    const ImgInputWrapper = getByTestId('img-input-wrapper')

    userEvent.upload(imageInput, file)

    await waitFor(() => getByRole('button', { name: /ImgDeleteIcon/i }))

    expect(ImgInputWrapper).toHaveStyle(
      'background-image: url(data:image/png;base64,KOKMkOKWoV/ilqEp)'
    )
  })

  it('calls onSubmit with the correct data', async () => {
    const { getByText, getByAltText, getByRole } = render(
      <EditPlantForm updatePlantData={onSubmitMock} plant={plant} />
    )

    const imageInput = getByAltText('image-input')

    userEvent.upload(imageInput, file)

    await waitFor(() => getByRole('button', { name: /ImgDeleteIcon/i }))

    user.click(getByText('Update'))

    expect(onSubmitMock).toHaveBeenCalledWith(
      {
        id: 1,
        name: 'Bob',
        species: 'Monstera',
        specialInfo: 'variegated',
      },
      {
        name: 'chucknorris.png',
        value: 'data:image/png;base64,KOKMkOKWoV/ilqEp',
      },
      1
    )
  })

  it('calls history push by clicking cancel', () => {
    const { getByText } = render(
      <EditPlantForm updatePlantData={onSubmitMock} plant={plant} />
    )

    user.click(getByText('Cancel'))

    expect(mockHistoryPush).toHaveBeenCalled()
  })
})
