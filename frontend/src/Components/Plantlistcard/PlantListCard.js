import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import monsteraImage from '../../assets/plant-images/3.jpg'
import PlantListBar from '../Indicatorbars/PlantListBar'

export default function PlantListCard({ plant, onClick }) {
  PlantListCard.propTypes = {
    plant: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  return (
    <CardWrapper onClick={onClick}>
      <ImgContainer src={monsteraImage} />
      <PlantName>{plant.name}</PlantName>
      <PlantListBar daysLeft={plant.daysLeft} weeksLeft={plant.weeksLeft} />
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
