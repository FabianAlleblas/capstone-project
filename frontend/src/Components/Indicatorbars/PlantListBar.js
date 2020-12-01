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
  grid-template-columns: 15px auto;
  gap: 20px 6px;
  place-items: center;
`

const Bar = styled.div`
  position: relative;
  width: 100%;
  background-color: var(--bar-bg-color);
  height: 2px;
  border-radius: 1px;
`

const WaterIndicator = styled.div`
  width: ${(props) => (100 / 10) * props.daysLeft}%;
  min-width: 5px;
  height: 6px;
  background-color: ${(props) =>
    props.daysLeft < 2 ? 'var(--warning-color)' : 'var(--bar-water-color)'};
  border-radius: 3px;
  position: absolute;
  top: -2px;
`

const FertilizerIndicator = styled.div`
  width: ${(props) => (100 / 4) * props.weeksLeft}%;
  min-width: 5px;
  height: 6px;
  background-color: ${(props) =>
    props.weeksLeft < 2
      ? 'var(--warning-color)'
      : 'var(--bar-fertilizer-color)'};
  border-radius: 3px;
  position: absolute;
  top: -2px;
`
