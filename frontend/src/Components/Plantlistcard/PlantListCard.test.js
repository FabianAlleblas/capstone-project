import { render } from '@testing-library/react'
import 'jest-styled-components'
import PlantListCard from './PlantListCard'

describe('PlantCard', () => {
  it('renders correctly', () => {
    const { container, getByText } = render(
      <PlantListCard name={'Jack'} species={'Monstera deliciosa'} />
    )

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText(/Jack/i)).toBeInTheDocument()
    expect(getByText(/Monstera deliciosa/i)).toBeInTheDocument()
  })
})
