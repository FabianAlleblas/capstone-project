import { render } from '@testing-library/react'
import 'jest-styled-components'
import PlantCard from './PlantCard'

describe('PlantCard', () => {
  it('renders correctly', () => {
    const { container, getByText } = render(
      <PlantCard plantname={'Jack'} plantspecies={'Monstera deliciosa'} />
    )

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText(/Jack/i)).toBeInTheDocument()
    expect(getByText(/Monstera deliciosa/i)).toBeInTheDocument()
  })
})
