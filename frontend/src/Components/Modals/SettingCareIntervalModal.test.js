import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import 'jest-styled-components'
import SettingCareIntervalModal from './SettingCareIntervalModal'

const setShowCareSettingMock = jest.fn()
const updateCareIntervalMock = jest.fn()

describe('SettingCareIntervalModal', () => {
  it('renders correctly', () => {
    const { container } = render(
      <SettingCareIntervalModal
        setShowCareSetting={setShowCareSettingMock}
        updateCareInterval={updateCareIntervalMock}
        plantId={1}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })
  it('calls updateCareIntervalMock with the correct data and calls also setShowCareSettingMock by clicking the save button', () => {
    const { getByPlaceholderText, getByText } = render(
      <SettingCareIntervalModal
        setShowCareSetting={setShowCareSettingMock}
        updateCareInterval={updateCareIntervalMock}
        plantId={1}
      />
    )

    user.type(getByPlaceholderText('1-99'), '10')
    user.click(getByText('Save'))

    expect(updateCareIntervalMock).toHaveBeenCalledWith(1, {
      waterInterval: '10',
    })
    expect(setShowCareSettingMock).toHaveBeenCalled()
  })
  it('calls setShowCareSettingMock by clicking the close button', () => {
    const { getByRole } = render(
      <SettingCareIntervalModal
        setShowCareSetting={setShowCareSettingMock}
        updateCareInterval={updateCareIntervalMock}
        plantId={1}
      />
    )

    user.click(getByRole('button', { name: /CloseIcon/i }))

    expect(setShowCareSettingMock).toHaveBeenCalled()
  })
  it('renders with the correct text and calls updateCareIntervalMock with the correct data', () => {
    const { getByPlaceholderText, getByLabelText, getByText } = render(
      <SettingCareIntervalModal
        setShowCareSetting={setShowCareSettingMock}
        updateCareInterval={updateCareIntervalMock}
        plantId={1}
        isFertilizer
      />
    )

    user.type(getByPlaceholderText('1-99'), '10')
    user.click(getByText('Save'))

    expect(updateCareIntervalMock).toHaveBeenCalledWith(1, {
      fertilizerInterval: '10',
    })

    expect(
      getByLabelText(/Set your preferred fertilizing interval/i)
    ).toBeInTheDocument()
  })
})
