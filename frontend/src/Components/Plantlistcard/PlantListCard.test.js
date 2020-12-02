import { render } from '@testing-library/react'
import 'jest-styled-components'
import PlantListCard from './PlantListCard'

describe('PlantCard', () => {
  it('renders correctly', () => {
    const { container, getByText } = render(
      <PlantListCard plant={{ name: 'Jack', daysLeft: 4, weeksLeft: 2 }} />
    )

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText(/Jack/i)).toBeInTheDocument()
  })
})
