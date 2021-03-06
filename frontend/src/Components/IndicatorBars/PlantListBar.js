import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FertilizerIcon, WaterIcon } from '../Icons'

PlantListBar.propTypes = {
  daysLeft: PropTypes.number.isRequired,
  weeksLeft: PropTypes.number.isRequired,
  waterInterval: PropTypes.number.isRequired,
  fertilizerInterval: PropTypes.number.isRequired,
}

export default function PlantListBar({
  daysLeft,
  weeksLeft,
  waterInterval,
  fertilizerInterval,
}) {
  return (
    <Container>
      <WaterIcon />
      <Bar>
        <WaterIndicator
          data-testid="water-indicator"
          daysLeft={daysLeft}
          waterInterval={waterInterval}
        />
      </Bar>
      <FertilizerIcon />
      <Bar>
        <FertilizerIndicator
          data-testid="fertilizer-indicator"
          weeksLeft={weeksLeft}
          fertilizerInterval={fertilizerInterval}
        />
      </Bar>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  gap: 6px 6px;
  grid-template-columns: 15px auto;
  padding: 10px 0 0;
  place-items: center;
  width: 100%;
`

const Bar = styled.div`
  background-color: var(--bar-bg-color);
  border-radius: 1px;
  height: 2px;
  position: relative;
  width: 100%;
`

const Indicator = styled.div`
  border-radius: 3px;
  height: 6px;
  min-width: 5px;
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
