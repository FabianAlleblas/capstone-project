import PlantDetails from './PlantDetails'
import { render } from '@testing-library/react'

describe('PlantDetailCard', () => {
  it('shows the correct name and info', () => {
    const { getByText } = render(
      <PlantDetails
        plant={{
          species: 'Monstera',
          specialInfo: 'variegated',
        }}
      />
    )

    expect(getByText('Monstera')).toBeInTheDocument()
    expect(getByText('variegated')).toBeInTheDocument()
  })
})
