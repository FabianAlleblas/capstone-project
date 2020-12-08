import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import monsteraImage from '../../assets/plant-images/3.jpg'
import PlantDetailBar from '../IndicatorBars/PlantDetailBar'
import Button from '../Buttons/Button'

export default function PlantDetailCard({ plant, resetTimer }) {
  PlantDetailCard.propTypes = {
    plant: PropTypes.object.isRequired,
    resetTimer: PropTypes.func,
  }
  return (
    <CardWrapper>
      <ImageFrame src={plant.image ?? monsteraImage} />
      <TextContainer>
        <PlantName>{plant.species}</PlantName>
        <PlantInfo>{plant.specialInfo}</PlantInfo>
      </TextContainer>
      <PlantDetailBar daysLeft={plant.daysLeft} weeksLeft={plant.weeksLeft} />
      <ButtonWrapper>
        <ResetButton onClick={() => resetTimer(plant.id, 'water')}>
          Watered
        </ResetButton>
        <ResetButton onClick={() => resetTimer(plant.id, 'fertilizer')}>
          Fertilized
        </ResetButton>
      </ButtonWrapper>
    </CardWrapper>
  )
}

const CardWrapper = styled.section`
  display: grid;
  gap: 30px;
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
const ButtonWrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
  padding: 20px 0 0;
  width: 100%;
`

const ResetButton = styled(Button)`
  background-color: var(--primary-dark);
  color: var(--primary-light);
`
