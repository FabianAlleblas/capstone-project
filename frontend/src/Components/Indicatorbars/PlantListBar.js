import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ReactComponent as FertilizerIcon } from '../../assets/icons/fertilizericon.svg'
import { ReactComponent as WaterIcon } from '../../assets/icons/watericon.svg'

export default function PlantListBar({ waterDays, fertilizerWeeks }) {
  PlantListBar.propTypes = {
    waterDays: PropTypes.string.isRequired,
    fertilizerWeeks: PropTypes.string.isRequired,
  }

  return (
    <Wrapper>
      <WaterIcon />
      <Bar>
        <WaterIndicator daysLeft={waterDays} />
      </Bar>
      <FertilizerIcon />
      <Bar>
        <FertilizerIndicator weeksLeft={fertilizerWeeks} />
      </Bar>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  gap: 20px 6px;
  grid-template-columns: 15px auto;
  place-items: center;
`

const Bar = styled.div`
  background-color: var(--bar-bg-color);
  border-radius: 1px;
  height: 2px;
  position: relative;
  width: 100%;
`

const WaterIndicator = styled.div`
  background-color: ${(props) =>
    props.daysLeft < 2 ? 'var(--warning-color)' : 'var(--bar-water-color)'};
  border-radius: 3px;
  height: 6px;
  min-width: 5px;
  position: absolute;
  top: -2px;
  width: ${(props) => (100 / 10) * props.daysLeft}%;
`

const FertilizerIndicator = styled.div`
  background-color: ${(props) =>
    props.weeksLeft < 2
      ? 'var(--warning-color)'
      : 'var(--bar-fertilizer-color)'};
  border-radius: 3px;
  height: 6px;
  min-width: 5px;
  position: absolute;
  top: -2px;
  width: ${(props) => (100 / 4) * props.weeksLeft}%;
`
