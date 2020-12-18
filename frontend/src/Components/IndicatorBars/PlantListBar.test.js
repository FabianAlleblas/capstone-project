import { render } from '@testing-library/react'
import 'jest-styled-components'
import PlantListBar from './PlantListBar'

describe('PlantDetailBar', () => {
  it('renders correctly', () => {
    const { container } = render(
      <PlantListBar
        daysLeft={10}
        weeksLeft={4}
        waterInterval={10}
        fertilizerInterval={4}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
  it('renders with the full length', () => {
    const { getByTestId } = render(
      <PlantListBar
        daysLeft={10}
        weeksLeft={4}
        waterInterval={10}
        fertilizerInterval={4}
      />
    )

    const WaterBar = getByTestId('water-indicator')
    const FertilizerBar = getByTestId('fertilizer-indicator')

    expect(WaterBar).toHaveStyle('width: 100%;')
    expect(FertilizerBar).toHaveStyle('width: 100%')
  })
  it('renders with the min length', () => {
    const { getByTestId } = render(
      <PlantListBar
        daysLeft={0}
        weeksLeft={0}
        waterInterval={10}
        fertilizerInterval={4}
      />
    )

    const WaterBar = getByTestId('water-indicator')
    const FertilizerBar = getByTestId('fertilizer-indicator')

    expect(WaterBar).toHaveStyle('width: 0%;')
    expect(FertilizerBar).toHaveStyle('width: 0%')
  })
})
