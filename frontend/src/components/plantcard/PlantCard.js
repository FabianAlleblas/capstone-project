//import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function PlantCard({ plantname, plantspecies }) {
  PlantCard.propTypes = {
    plantname: PropTypes.string.isRequired,
    plantspecies: PropTypes.string.isRequired,
  }

  return (
    <div>
      <div></div>
      <p>{plantname}</p>
      <p>{plantspecies}</p>
    </div>
  )
}
