import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import monsteraImage from '../../assets/plant-images/3.jpg'

export default function PlantDetailCard({ species, info, className }) {
  PlantDetailCard.propTypes = {
    species: PropTypes.string.isRequired,
    info: PropTypes.string,
    className: PropTypes.string,
  }
  return (
    <CardWrapper className={className}>
      <ImageFrame src={monsteraImage} />
      <TextContainer>
        <PlantName>{species}</PlantName>
        <PlantInfo>{info}</PlantInfo>
      </TextContainer>
    </CardWrapper>
  )
}

const CardWrapper = styled.section`
  display: grid;
  gap: 40px;
  place-items: center;
`

const ImageFrame = styled.div`
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover, contain;
  border-radius: 50%;
  height: 200px;
  width: 200px;
`

const TextContainer = styled.div`
  text-align: center;
`

const PlantName = styled.h2`
  color: var(--primary-plant-font-color);
  font-size: 1.5rem;
  font-weight: 700;
`

const PlantInfo = styled.h3`
  color: var(--secondary-plant-font-color);
  font-size: 1.5rem;
  font-weight: 400;
`
