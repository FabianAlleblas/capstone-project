import { render } from '@testing-library/react'
import 'jest-styled-components'
import plants from '../data/plants.json'
import PlantListPage from './PlantListPage'

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
