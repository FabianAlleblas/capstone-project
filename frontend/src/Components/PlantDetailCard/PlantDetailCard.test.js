import PlantDetailCard from './PlantDetailCard'
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'

const onSubmitMock = jest.fn()

describe('PlantDetailCard', () => {
  it('shows the correct name and info', () => {
    const { getByText } = render(
      <PlantDetailCard
        plant={{
          species: 'Monstera',
          specialInfo: 'variegated',
          daysLeft: 2,
          weeksLeft: 3,
        }}
      />
    )

    expect(getByText('Monstera')).toBeInTheDocument()
    expect(getByText('variegated')).toBeInTheDocument()
  })
  it('calls the onSubmitMock if the watered button is clicked', () => {
    const { getByText } = render(
      <PlantDetailCard
        plant={{
          species: 'Monstera',
          specialInfo: 'variegated',
          daysLeft: 2,
          weeksLeft: 3,
        }}
        resetTimer={onSubmitMock}
      />
    )

    user.click(getByText('Watered'))

    expect(onSubmitMock).toHaveBeenCalled()
  })
  it('calls the onSubmitMock if the fertilized button is clicked', () => {
    const { getByText } = render(
      <PlantDetailCard
        plant={{
          species: 'Monstera',
          specialInfo: 'variegated',
          daysLeft: 2,
          weeksLeft: 3,
        }}
        resetTimer={onSubmitMock}
      />
    )

    user.click(getByText('Fertilized'))

    expect(onSubmitMock).toHaveBeenCalled()
  })
})
