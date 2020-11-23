import { render } from '@testing-library/react'
import 'jest-styled-components'
import PlantCard from '../components/plantcard/PlantCard'
import PlantListPage from './PlantListPage'
import plants from '../data/plants.json'

describe('PlantListPage', () => {
  it('renders correctly', () => {
    const { container } = render(<PlantListPage />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('displays the plant names and species', () => {
    const { getByText } = render(<PlantListPage />)

    plants.forEach(({ name }) => expect(getByText(name)).toBeInTheDocument())
    plants.forEach(({ species }) =>
      expect(getByText(species)).toBeInTheDocument()
    )
  })
})
