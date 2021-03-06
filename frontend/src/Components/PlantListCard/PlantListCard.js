import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import defaultPlantImage from '../../assets/plant-images/default_plant.jpg'
import PlantListBar from '../IndicatorBars/PlantListBar'

PlantListCard.propTypes = {
  plant: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default function PlantListCard({ plant, onClick }) {
  return (
    <CardWrapper onClick={onClick}>
      <ImgContainer
        data-testid="img-container"
        src={plant.image ?? defaultPlantImage}
      />
      <PlantName>{plant.name}</PlantName>
      <PlantListBar
        daysLeft={plant.daysLeft}
        weeksLeft={plant.weeksLeft}
        waterInterval={plant.waterInterval}
        fertilizerInterval={plant.fertilizerInterval}
      />
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  display: grid;
  place-items: center;
`

const ImgContainer = styled.div`
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover, contain;
  border-radius: 50%;
  height: 100px;
  margin-bottom: 10px;
  width: 100px;
`

const PlantName = styled.h5`
  color: var(--primary-plant-font-color);
  font-size: 1.25rem;
  font-weight: 400;
`
