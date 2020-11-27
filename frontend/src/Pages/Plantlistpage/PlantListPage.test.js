import { render } from '@testing-library/react'
import 'jest-styled-components'
import plants from '../../data/plants.json'
import PlantListPage from './PlantListPage'

describe('PlantListPage', () => {
  it('renders correctly', () => {
    const { container } = render(<PlantListPage plantList={plants} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('displays the plant names and species', () => {
    const { getByText } = render(<PlantListPage plantList={plants} />)

    plants.forEach(({ plantname }) =>
      expect(getByText(plantname)).toBeInTheDocument()
    )
    plants.forEach(({ plantspecies }) =>
      expect(getByText(plantspecies)).toBeInTheDocument()
    )
  })
})
