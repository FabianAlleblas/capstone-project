import { render } from '@testing-library/react'
import 'jest-styled-components'
import plants from '../../data/plants.json'
import PlantListPage from './PlantListPage'

describe('PlantListPage', () => {
  it('renders correctly', () => {
    const { container } = render(<PlantListPage plantList={plants} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('displays the plant names', () => {
    const { getByText } = render(<PlantListPage plantList={plants} />)

    plants.forEach(({ name }) => expect(getByText(name)).toBeInTheDocument())
  })
})
