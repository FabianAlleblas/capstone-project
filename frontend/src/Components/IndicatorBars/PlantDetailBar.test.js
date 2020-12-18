import { render } from '@testing-library/react'
import 'jest-styled-components'
import user from '@testing-library/user-event'
import PlantDetailBar from './PlantDetailBar'

const plant = {
  daysLeft: 10,
  weeksLeft: 4,
  waterInterval: 10,
  fertilizerInterval: 4,
}

const setShowCareSettingMock = jest.fn()

describe('PlantDetailBar', () => {
  it('renders correctly', () => {
    const { container } = render(
      <PlantDetailBar
        plant={plant}
        setShowCareSetting={setShowCareSettingMock}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
  it('calls setShowCareSettingMock with the correct name', () => {
    const { getByTestId } = render(
      <PlantDetailBar
        plant={plant}
        setShowCareSetting={setShowCareSettingMock}
      />
    )
    const WaterIconButton = getByTestId('water-button')

    user.click(WaterIconButton)

    expect(setShowCareSettingMock).not.toHaveBeenCalledWith('fertilizer')
    expect(setShowCareSettingMock).toHaveBeenCalledWith('water')
  })
  it('renders the full length of the bars', () => {
    const { getByTestId } = render(
      <PlantDetailBar
        plant={plant}
        setShowCareSetting={setShowCareSettingMock}
      />
    )
    const WaterBar = getByTestId('water-indicator')
    const FertilizerBar = getByTestId('fertilizer-indicator')

    expect(WaterBar).toHaveStyle('width: 100%;')
    expect(FertilizerBar).toHaveStyle('width: 100%')
  })
  it('renders the min length of the bars', () => {
    const { getByTestId } = render(
      <PlantDetailBar
        plant={{
          daysLeft: 0,
          weeksLeft: 0,
          waterInterval: 10,
          fertilizerInterval: 4,
        }}
        setShowCareSetting={setShowCareSettingMock}
      />
    )
    const WaterBar = getByTestId('water-indicator')
    const FertilizerBar = getByTestId('fertilizer-indicator')

    expect(WaterBar).toHaveStyle('width: 0%')
    expect(FertilizerBar).toHaveStyle('width: 0%')
  })
})
