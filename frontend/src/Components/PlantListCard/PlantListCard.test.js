import { render } from '@testing-library/react'
import PlantListCard from './PlantListCard'

const plant = {
  name: 'Jack',
  daysLeft: 4,
  weeksLeft: 2,
  waterInterval: 10,
  fertilizerInterval: 4,
}
const onClickMock = jest.fn()

describe('PlantCard', () => {
  it('shows the correct name', () => {
    const { getByText } = render(
      <PlantListCard plant={plant} onClick={onClickMock} />
    )

    expect(getByText(/Jack/i)).toBeInTheDocument()
  })
})
