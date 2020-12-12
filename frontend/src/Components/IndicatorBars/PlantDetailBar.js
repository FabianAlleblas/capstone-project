import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'
import { SettingsIcon } from '../Icons'
import SettingCareIntervalModal from '../Modals/SettingCareIntervalModal'

PlantDetailBar.propTypes = {
  plant: PropTypes.object.isRequired,
  updateCareInterval: PropTypes.func,
}

export default function PlantDetailBar({ plant, updateCareInterval }) {
  const [showCareSetting, setShowCareSetting] = useState({})

  return (
    <Container>
      <BarWrapper>
        <Bar>
          <WaterIndicator
            daysLeft={plant.daysLeft}
            waterInterval={plant.waterInterval}
          />
        </Bar>
        <CareIntervalWrapper>
          <Text>
            Water {plant.daysLeft}/{plant.waterInterval} days left
          </Text>
          <IconButton name="water" onClick={openCareSettings}>
            <SettingsIcon />
          </IconButton>
          {showCareSetting?.water && (
            <ModalStyled
              onClick={closeCareSetting}
              setShowCareSetting={setShowCareSetting}
              updateCareInterval={updateCareInterval}
              plantId={plant.id}
            />
          )}
        </CareIntervalWrapper>
      </BarWrapper>
      <BarWrapper>
        <Bar>
          <FertilizerIndicator
            weeksLeft={plant.weeksLeft}
            fertilizerInterval={plant.fertilizerInterval}
          />
        </Bar>
        <CareIntervalWrapper>
          <Text>
            Fertilizer {plant.weeksLeft}/{plant.fertilizerInterval} weeks left
          </Text>
          <IconButton name="fertilizer" onClick={openCareSettings}>
            <SettingsIcon />
          </IconButton>
          {showCareSetting?.fertilizer && (
            <ModalStyled
              isFertilizer
              onClick={closeCareSetting}
              setShowCareSetting={setShowCareSetting}
              updateCareInterval={updateCareInterval}
              plantId={plant.id}
            />
          )}
        </CareIntervalWrapper>
      </BarWrapper>
    </Container>
  )

  function openCareSettings(event) {
    setShowCareSetting({ [event.currentTarget.name]: true })
  }

  function closeCareSetting() {
    setShowCareSetting({})
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
const ModalStyled = styled(SettingCareIntervalModal)`
  position: absolute;
  top: 0;
  left: 0;
`
