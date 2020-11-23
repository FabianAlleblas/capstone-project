import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import monsteraImage from '../../assets/plant-images/3.jpg'

export default function PlantCard({ name, species }) {
  PlantCard.propTypes = {
    name: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
  }

  return (
    <CardWrapper>
      <ImgContainer src={monsteraImage} />
      <PlantName>{name}</PlantName>
      <PlantSpecies>{species}</PlantSpecies>
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  display: grid;
  justify-items: center;
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

const PlantName = styled.p`
  color: var(--primary-plant-font-color);
  font-size: 1.25rem;
`

const PlantSpecies = styled.p`
  color: var(--secondary-plant-font-color);
  font-size: 0.75rem;
`
