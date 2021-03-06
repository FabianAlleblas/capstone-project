import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import PlusButton from '../../Components/Buttons/PlusButton'
import Header from '../../Components/Header/Header'
import PlantListCard from '../../Components/PlantListCard/PlantListCard'

PlantListPage.propTypes = {
  plantList: PropTypes.array.isRequired,
  userLogout: PropTypes.func.isRequired,
}

export default function PlantListPage({ plantList, userLogout }) {
  const history = useHistory()

  return (
    <>
      <FixedHeader showLogoutButton onClickLogout={userLogout}>
        My Plants
      </FixedHeader>
      <ListContainer>
        {plantList.map((plant) => (
          <PlantListCard
            key={plant.id}
            plant={plant}
            onClick={() => openDetailPage(plant.id)}
          />
        ))}
      </ListContainer>
      <FixedPlusButton onClick={openAddForm} plantList={plantList} />
    </>
  )

  function openAddForm() {
    if (plantList.length < 6) {
      history.push('/add-plant')
    }
  }
  function openDetailPage(id) {
    history.push(`/plant?id=${id}`)
  }
}

const FixedHeader = styled(Header)`
  left: 0;
  position: fixed;
  top: 0;
`

const ListContainer = styled.main`
  display: grid;
  gap: 40px 30px;
  grid-template-columns: 1fr 1fr;
  padding: 100px 30px 90px;
`
const FixedPlusButton = styled(PlusButton)`
  bottom: 20px;
  position: fixed;
  right: 20px;
  opacity: ${(props) => props.plantList.length >= 6 && '0.5'};
`
