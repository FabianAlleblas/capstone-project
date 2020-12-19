import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SettingsIcon } from '../Icons'

PlantDetailBar.propTypes = {
  plant: PropTypes.object.isRequired,
  setShowCareSetting: PropTypes.func.isRequired,
}

export default function PlantDetailBar({ plant, setShowCareSetting }) {
  return (
    <Container>
      <BarWrapper>
        <Bar>
          <WaterIndicator
            data-testid="water-indicator"
            daysLeft={plant.daysLeft}
            waterInterval={plant.waterInterval}
          />
        </Bar>
        <CareIntervalWrapper>
          <Text>
            Water {plant.daysLeft}/{plant.waterInterval} days left
          </Text>
          <IconButton
            data-testid="water-button"
            name="water"
            onClick={openCareSettings}
          >
            <SettingsIcon />
          </IconButton>
        </CareIntervalWrapper>
      </BarWrapper>
      <BarWrapper>
        <Bar>
          <FertilizerIndicator
            data-testid="fertilizer-indicator"
            weeksLeft={plant.weeksLeft}
            fertilizerInterval={plant.fertilizerInterval}
          />
        </Bar>
        <CareIntervalWrapper>
          <Text>
            Fertilizer {plant.weeksLeft}/{plant.fertilizerInterval} weeks left
          </Text>
          <IconButton
            data-testid="fertilizer-button"
            name="fertilizer"
            onClick={openCareSettings}
          >
            <SettingsIcon />
          </IconButton>
        </CareIntervalWrapper>
      </BarWrapper>
    </Container>
  )

  function openCareSettings(event) {
    setShowCareSetting(event.currentTarget.name)
  }
}

const Container = styled.div`
  display: grid;
  gap: 20px;
  padding: 10px 0 0;
  width: 100%;
`

const BarWrapper = styled.div`
  display: grid;
  gap: 10px;
`

const Bar = styled.div`
  background-color: var(--bar-bg-color);
  border-radius: 2px;
  height: 4px;
  position: relative;
  width: 100%;
`

const Indicator = styled.div`
  border-radius: 4px;
  height: 8px;
  min-width: 10px;
  position: absolute;
  top: -2px;
`

const WaterIndicator = styled(Indicator)`
  background-color: ${(props) =>
    props.daysLeft < 2 ? 'var(--warning-color)' : 'var(--bar-water-color)'};
  width: ${(props) => (100 / props.waterInterval) * props.daysLeft}%;
`

const FertilizerIndicator = styled(Indicator)`
  background-color: ${(props) =>
    props.weeksLeft < 2
      ? 'var(--warning-color)'
      : 'var(--bar-fertilizer-color)'};
  width: ${(props) => (100 / props.fertilizerInterval) * props.weeksLeft}%;
`

const CareIntervalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Text = styled.p`
  color: var(--secondary-plant-font-color);
  font-size: 1rem;
`

const IconButton = styled.button`
  background-color: transparent;
  border: none;
`
