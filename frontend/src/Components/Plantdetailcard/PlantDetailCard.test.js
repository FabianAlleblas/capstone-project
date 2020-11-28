import PlantDetailCard from './PlantDetailCard'
import { render } from '@testing-library/react'

describe('PlantDetailCard', () => {
  it('Shows the correct name and info', () => {
    const { getByText } = render(
      <PlantDetailCard species={'Monstera'} info={'variegated'} />
    )

    expect(getByText('Monstera')).toBeInTheDocument()
    expect(getByText('variegated')).toBeInTheDocument()
  })
})
