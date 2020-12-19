import { render } from '@testing-library/react'
import 'jest-styled-components'
import AddPage from './AddPage'

const savePlantDataMock = jest.fn()

describe('AddPage', () => {
  it('renders correctly', () => {
    const { container } = render(<AddPage savePlantData={savePlantDataMock} />)
    expect(container).toMatchSnapshot()
  })
})
