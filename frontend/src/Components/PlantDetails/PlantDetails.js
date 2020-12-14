import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import defaultPlantImage from '../../assets/plant-images/default_plant.jpg'

PlantDetails.propTypes = {
  plant: PropTypes.object.isRequired,
}

export default function PlantDetails({ plant }) {
  return (
    <>
      <ImageFrame src={plant.image ?? defaultPlantImage} />
      <TextContainer>
        <PlantName>{plant.species}</PlantName>
        <PlantInfo>{plant.specialInfo}</PlantInfo>
      </TextContainer>
    </>
  )
}

const ImageFrame = styled.div`
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover, contain;
  border-radius: 50%;
  height: 200px;
  width: 200px;
`

const TextContainer = styled.div`
  line-height: 1.2;
  text-align: center;
`

const PlantName = styled.h2`
  color: var(--primary-plant-font-color);
  font-size: 1.4rem;
  font-weight: 700;
`

const PlantInfo = styled.h3`
  color: var(--secondary-plant-font-color);
  font-size: 1.4rem;
  font-weight: 400;
`
