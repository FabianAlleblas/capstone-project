import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'
import { SettingsIcon } from '../Icons'
import SettingCareIntervalModal from '../Modals/SettingCareIntervalModal'

export default function PlantDetailBar({ daysLeft, weeksLeft }) {
  PlantDetailBar.propTypes = {
    daysLeft: PropTypes.number.isRequired,
    weeksLeft: PropTypes.number.isRequired,
  }

  const [isCareSettingShown, setIsCareSettingShown] = useState()

  return (
    <Container>
      <BarWrapper>
        <Bar>
          <WaterIndicator daysLeft={daysLeft} />
        </Bar>
        <CareIntervalWrapper>
          <Text>Water {daysLeft}/10 days left</Text>
          <IconButton name="water" onClick={openCareSettings}>
            <SettingsIcon />
          </IconButton>
          {isCareSettingShown?.water && (
            <ModalStyled
              onClick={closeCareSetting}
              onSubmit={saveCareInterval}
            />
          )}
        </CareIntervalWrapper>
      </BarWrapper>
      <BarWrapper>
        <Bar>
          <FertilizerIndicator weeksLeft={weeksLeft} />
        </Bar>
        <CareIntervalWrapper>
          <Text>Fertilizer {weeksLeft}/4 weeks left</Text>
          <IconButton name="fertilizer" onClick={openCareSettings}>
            <SettingsIcon />
          </IconButton>
          {isCareSettingShown?.fertilizer && (
            <ModalStyled
              isFertilizer
              onClick={closeCareSetting}
              onSubmit={saveCareInterval}
            />
          )}
        </CareIntervalWrapper>
      </BarWrapper>
    </Container>
  )

  function openCareSettings(event) {
    setIsCareSettingShown({ [event.currentTarget.name]: true })
  }

  function saveCareInterval(event) {
    event.preventDefault()
  }

  function closeCareSetting() {
    setIsCareSettingShown()
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
  width: ${(props) => (100 / 10) * props.daysLeft}%;
`

const FertilizerIndicator = styled(Indicator)`
  background-color: ${(props) =>
    props.weeksLeft < 2
      ? 'var(--warning-color)'
      : 'var(--bar-fertilizer-color)'};
  width: ${(props) => (100 / 4) * props.weeksLeft}%;
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
const ModalStyled = styled(SettingCareIntervalModal)`
  position: absolute;
  top: 0;
  left: 0;
`
