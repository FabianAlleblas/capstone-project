import { render } from '@testing-library/react'
import 'jest-styled-components'
import defaultPlantImage from '../../assets/plant-images/default_plant.jpg'
import PlantDetails from './PlantDetails'

describe('PlantDetailCard', () => {
  it('renders correctly', () => {
    const { container } = render(
      <PlantDetails
        plant={{
          species: 'Monstera',
          specialInfo: 'variegated',
        }}
      />
    )

    expect(container).toMatchSnapshot()
  })

  it('shows the correct name, info and default image', () => {
    const { getByText, getByTestId } = render(
      <PlantDetails
        plant={{
          species: 'Monstera',
          specialInfo: 'variegated',
        }}
      />
    )

    expect(getByText('Monstera')).toBeInTheDocument()
    expect(getByText('variegated')).toBeInTheDocument()
    expect(getByTestId('image-frame')).toHaveStyle(
      `background-image: url(${defaultPlantImage})`
    )
  })
})
