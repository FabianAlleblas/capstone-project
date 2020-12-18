import { render } from '@testing-library/react'
import 'jest-styled-components'
import PlantListCard from './PlantListCard'
import defaultPlantImage from '../../assets/plant-images/default_plant.jpg'

const plant = {
  name: 'Jack',
  daysLeft: 5,
  weeksLeft: 2,
  waterInterval: 10,
  fertilizerInterval: 4,
}
const onClickMock = jest.fn()

describe('PlantCard', () => {
  it('renders correctly', () => {
    const { container } = render(
      <PlantListCard plant={plant} onClick={onClickMock} />
    )

    expect(container.firstChild).toMatchSnapshot()
  })
  it('shows the correct name, bar length and default picture', () => {
    const { getByText, getByTestId } = render(
      <PlantListCard plant={plant} onClick={onClickMock} />
    )

    const WaterBar = getByTestId('water-indicator')
    const FertilizerBar = getByTestId('fertilizer-indicator')
    const ImgContainer = getByTestId('img-container')

    expect(WaterBar).toHaveStyle('width: 50%;')
    expect(FertilizerBar).toHaveStyle('width: 50%')

    expect(ImgContainer).toHaveStyle(
      `background-image: url(${defaultPlantImage})`
    )

    expect(getByText(/Jack/i)).toBeInTheDocument()
  })
})
