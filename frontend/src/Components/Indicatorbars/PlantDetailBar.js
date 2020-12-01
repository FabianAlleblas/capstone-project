import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function PlantDetailBar({ daysLeft, weeksLeft }) {
  PlantDetailBar.propTypes = {
    daysLeft: PropTypes.number.isRequired,
    weeksLeft: PropTypes.number.isRequired,
  }

  return (
    <Container>
      <BarWrapper>
        <Bar>
          <WaterIndicator daysLeft={daysLeft} />
        </Bar>
        <Text>Water {daysLeft}/10 days left</Text>
      </BarWrapper>
      <BarWrapper>
        <Bar>
          <FertilizerIndicator weeksLeft={weeksLeft} />
        </Bar>
        <Text>Fertilizer {weeksLeft}/4 weeks left</Text>
      </BarWrapper>
    </Container>
  )
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

const Text = styled.p`
  color: var(--secondary-plant-font-color);
  font-size: 1rem;
`

const Bar = styled.div`
  background-color: var(--bar-bg-color);
  border-radius: 2px;
  height: 4px;
  position: relative;
  width: 100%;
`

const WaterIndicator = styled.div`
  background-color: ${(props) =>
    props.daysLeft < 2 ? 'var(--warning-color)' : 'var(--bar-water-color)'};
  border-radius: 4px;
  height: 8px;
  min-width: 10px;
  position: absolute;
  top: -2px;
  width: ${(props) => (100 / 10) * props.daysLeft}%;
`

const FertilizerIndicator = styled.div`
  background-color: ${(props) =>
    props.weeksLeft < 2
      ? 'var(--warning-color)'
      : 'var(--bar-fertilizer-color)'};
  border-radius: 4px;
  height: 8px;
  min-width: 10px;
  position: absolute;
  top: -2px;
  width: ${(props) => (100 / 4) * props.weeksLeft}%;
`
